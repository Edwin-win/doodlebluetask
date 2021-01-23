const library = require("../Library/library");
const {
  login,
  userInfo,
  registration,
} = require("./userAuthentication.controller");

//Task 3 --> Api for Basic login and registration setup
//Task 4 --> JWT token should be properly handled for all the API

//The above task routes are here

library.router.post("/userLogin", login);
library.router.post("/userRegistration", registration);
library.router.post("/userDetails", library.authorization.checkToken, userInfo);

module.exports = library.router;
