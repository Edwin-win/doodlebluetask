const library = require("../Library/library");
const { inventoryUpload } = require("./inventoryUpload.controller");

library.router.post(
  "/inventoryUpload",
  library.authorization.checkToken,
  inventoryUpload
);

module.exports = library.router;
