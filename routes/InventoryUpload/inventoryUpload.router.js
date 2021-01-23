const library = require("../Library/library");
const { inventoryUpload } = require("./inventoryUpload.controller");

//Task 1 --> Create an API to upload the product information into the database.
//All products should be created via upload only.
//Task 2 --> If product info already exist in the database , should update it else insert the product 
//Task 4 --> JWT token should be properly handled for all the API

//The above task api is started from here

library.router.post(
  "/inventoryUpload",
  library.authorization.checkToken,
  inventoryUpload
);

module.exports = library.router;
