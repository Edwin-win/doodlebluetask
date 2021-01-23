const {
  userLogin,
  getUserInfo,
  userRegistration,
} = require("./userAuthentication.service");
const library = require("../Library/library");

module.exports = {
  login: (req, res) => {
    const body = req.body;
    const bodyValidation = library.bodyContentValidation.requestContentValidation(
      req.body
    );

    if (bodyValidation.status === 1) {
      userLogin(body, async (err, response) => {
        if (err) {
          console.log(err);
          res.send(library.errorData.errorCodeResponse(err.errno));
        } else {
          console.log(response);
          if (response.length > 0) {
            const hashPassword = await library.bcrypt.compareSync(
              body.password,
              response[0].user_password
            );

            if (hashPassword) {
              console.log("hashresponse", response);

              const token = library.jwt.sign(
                {
                  userId: response[0].user_id,
                  userType: response[0].user_type,
                },
                process.env.JWT_KEY,
                { expiresIn: "5h" }
              );

              return res.send({
                status: 1,
                msg: "Success",
                data: token,
              });
            } else {
              return res.send({
                status: 0,
                msg: "Username or Password Invalid",
                data: [],
              });
            }
          } else {
            return res.send({
              status: 0,
              msg: "Please Enter the Valid Credentials",
              data: [],
            });
          }
        }
      });
    } else {
      return res.send(bodyValidation);
    }
  },

  userInfo: (req, res) => {
    const userId = res.locals.userData.userId;
    getUserInfo(userId, (err, response) => {
      if (err) {
        console.log(err);
        res.send(library.errorData.errorCodeResponse(err.errno));
      } else {
        if (response.length > 0) {
          return res.send({
            status: 1,
            msg: "Success",
            data: response,
          });
        } else {
          return res.send({
            status: 0,
            msg: "No Data Avilable",
            data: [],
          });
        }
      }
    });
  },
  registration: (req, res) => {
    const body = req.body;
    const bodyValidation = library.bodyContentValidation.requestContentValidation(
      req.body
    );

    if (bodyValidation.status === 1) {
      userRegistration(body, (err, response) => {
        if (err) {
          console.log(err);
          res.send(library.errorData.errorCodeResponse(err.errno));
        } else {
          if (response.affectedRows === 1) {
            return res.send({
              status: 1,
              msg: "Registration was success",
              data: [],
            });
          } else {
            return res.send({
              status: 0,
              msg: "Registration was Failed",
              data: [],
            });
          }
        }
      });
    } else {
      return res.send(bodyValidation);
    }
  },
};
