const {
  addOrder,
  editOrderDetails,
  cancelOrderDetails,
  orderDetails,
  productCountBasedOnDate,
  customerDetailsBasedOnPurchasedCount,
} = require("./orders.service");
const library = require("../Library/library");

module.exports = {
  createOrder: (req, res) => {
    const body = req.body;
    const userData = res.locals.userData;
    const bodyValidation = library.bodyContentValidation.requestContentValidation(
      req.body
    );

    if (body.OrderList.length > 0) {
      if (bodyValidation.status === 1) {
        addOrder(body, userData, (err, response) => {
          if (err) {
            console.log(err);
            return res.send(library.errorData.errorCodeResponse(err.errno));
          } else {
            return res.send(response);
          }
        });
      } else {
        return res.send(bodyValidation);
      }
    } else {
      return res.send({
        status: 0,
        msg: "Order List is Empty",
        data: [],
      });
    }
  },
  editOrder: (req, res) => {
    const body = req.body;
    const userData = res.locals.userData;
    const bodyValidation = library.bodyContentValidation.requestContentValidation(
      req.body
    );

    if (bodyValidation.status === 1) {
      editOrderDetails(body, userData, (err, response) => {
        if (err) {
          console.log(err);
          return res.send(library.errorData.errorCodeResponse(err.errno));
        } else {
          return res.send(response);
        }
      });
    } else {
      return res.send(bodyValidation);
    }
  },
  cancelOrder: (req, res) => {
    const body = req.body;
    const userData = res.locals.userData;
    const bodyValidation = library.bodyContentValidation.requestContentValidation(
      req.body
    );

    if (bodyValidation.status === 1) {
      cancelOrderDetails(body, userData, (err, response) => {
        if (err) {
          console.log(err);
          return res.send(library.errorData.errorCodeResponse(err.errno));
        } else {
          return res.send(response);
        }
      });
    } else {
      return res.send(bodyValidation);
    }
  },
  orderDetailsAndSearch: (req, res) => {
    const body = req.body;
    const bodyValidation = library.bodyContentValidation.requestContentValidation(
      req.body
    );

    if (bodyValidation.status === 1) {
      orderDetails(body, (err, response) => {
        if (err) {
          console.log(err);
          return res.send(library.errorData.errorCodeResponse(err.errno));
        } else {
          // console.log(response)
          if (response[0].details.length > 0) {
            return res.send({
              status: 1,
              msg: "Success",
              data: response,
            });
          } else {
            return res.send({
              status: 0,
              msg: "No Data Available",
              data: [],
            });
          }
        }
      });
    } else {
      return res.send(bodyValidation);
    }
  },
  orderedProductCountBasedOnDate: (req, res) => {
    const body = req.body;
    const bodyValidation = library.bodyContentValidation.requestContentValidation(
      req.body
    );

    if (bodyValidation.status === 1) {
      productCountBasedOnDate(body, (err, response) => {
        if (err) {
          console.log(err);
          return res.send(library.errorData.errorCodeResponse(err.errno));
        } else {
          // console.log(response)
          if (response.length > 0) {
            return res.send({
              status: 1,
              msg: "Success",
              data: response,
            });
          } else {
            return res.send({
              status: 0,
              msg: "No Data Available",
              data: [],
            });
          }
        }
      });
    } else {
      return res.send(bodyValidation);
    }
  },
  customersListBasedOnNumberOfProductsPurchased: (req, res) => {
    const body = req.body;

    customerDetailsBasedOnPurchasedCount(body, (err, response) => {
      if (err) {
        console.log(err);
        return res.send(library.errorData.errorCodeResponse(err.errno));
      } else {
        // console.log(response)
        if (response.length > 0) {
          return res.send({
            status: 1,
            msg: "Success",
            data: response,
          });
        } else {
          return res.send({
            status: 0,
            msg: "No Data Available",
            data: [],
          });
        }
      }
    });
  },
};
