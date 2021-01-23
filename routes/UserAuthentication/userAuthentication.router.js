const library = require("../Library/library");
const {
  login,
  userInfo,
  registration,
} = require("./userAuthentication.controller");

library.router.post("/userLogin", login);
library.router.post("/userRegistration", registration);
library.router.post("/userDetails", library.authorization.checkToken, userInfo);

module.exports = library.router;
