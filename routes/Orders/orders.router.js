const library = require("../Library/library");
const {
  createOrder,
  editOrder,
  cancelOrder,
  orderDetailsAndSearch,
  orderedProductCountBasedOnDate,
  customersListBasedOnNumberOfProductsPurchased,
} = require("./orders.controller");
library.router.post(
  "/createOrder",
  library.authorization.checkToken,
  createOrder
);
library.router.post("/editOrder", library.authorization.checkToken, editOrder);
library.router.post(
  "/cancelOrder",
  library.authorization.checkToken,
  cancelOrder
);
library.router.post(
  "/orderDetailsAndSearch",
  library.authorization.checkToken,
  orderDetailsAndSearch
);

library.router.post(
  "/orderedProductCountBasedOnDate",
  library.authorization.checkToken,
  orderedProductCountBasedOnDate
);

library.router.post(
  "/customersListBasedOnNumberOfProductsPurchased",
  library.authorization.checkToken,
  customersListBasedOnNumberOfProductsPurchased
);
module.exports = library.router;
