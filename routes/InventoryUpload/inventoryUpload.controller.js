const { inventoryUploadDetails } = require("./inventoryUpload.service");
const library = require("../Library/library");

module.exports = {
  inventoryUpload: (req, res) => {
    const bodyFile = req.files;

    const userType = res.locals.userData.userType;

    if (userType === 1) {
      const userId = res.locals.userData.userId;
      // console.log("userId",userId);
      inventoryUploadDetails(bodyFile, userId, (err, response) => {
        if (err) {
          console.log(err);
          return res.send(library.errorData.errorCodeResponse(err.errno));
        } else {
          return res.send(response);
        }
      });
    } else {
      return res.send({
        status: 0,
        msg: "Admin only can upload the inventory,Unauthorized used",
        data: [],
      });
    }
  },
};
