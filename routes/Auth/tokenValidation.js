const jwt = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    try {
      var token = req.headers.authorization.split(" ")[1];

      var verified = jwt.decode(token, process.env.JWT_KEY);
      console.log("verified", verified);
      if (verified) {
        res.locals.userData = verified;
        next();
      } else {
        res.send({ status: 0, msg: "Authentication failed", data: [] });
      }
    } catch (error) {
      res.send({ status: 0, msg: "Authentication failed", data: [] });
    }
  },
};
