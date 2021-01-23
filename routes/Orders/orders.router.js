const library = require("../Library/library");
const {
  createOrder,
  editOrder,
  cancelOrder,
  orderDetailsAndSearch,
  orderedProductCountBasedOnDate,
  customersListBasedOnNumberOfProductsPurchased,
} = require("./orders.controller");


//Task 4 --> JWT token should be properly handled for all the API
//Task 5 --> Create an API to create order, update order, cancel order.
//TASK 6 --> Create an api to list ordered products based on the customer. 
//(Should include search and sort functionality) 
//TASK 7 --> Api to list ordered product count based on date
//TASK 8 --> Api to list customers based on the number of products purchased.


//The above task routes are here


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
