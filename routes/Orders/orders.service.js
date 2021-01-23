const library = require("../Library/library");

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

module.exports = {
  addOrder: async (data, userData, callback) => {
    const { orderTotalAmount, orderPaymentMode, orderCollectAmount } = data;
    var query =
      "INSERT INTO `trn_order`(`user_id`, `order_total_amount`, `order_payment_mode`, `order_collect_amount`,order_status, `order_createdBy`, `order_createdOn`) VALUES (?,?,?,?,?,?,NOW());";

    library.db.query(
      query,
      [
        userData.userId,
        orderTotalAmount,
        orderPaymentMode,
        orderCollectAmount,
        1,
        userData.userId,
      ],
      async (err, response) => {
        if (err) {
          return callback(err);
        } else {
          console.log(response);
          let orderId = response.insertId;
          if (response.affectedRows === 1) {
            let orderDetailsAdding = await orderDetailsAddingHandler(
              data.OrderList,
              orderId
            );

            console.log(orderDetailsAdding);
            if (orderDetailsAdding.status) {
              return callback(null, {
                status: 1,
                msg: "Order Successfully Placed",
                data: [],
              });
            } else {
              let deleteOrder = await deleteOrderHandler(orderId);
              let deleteOrderDetails = await deleteOrderDetailsHandler(orderId);

              return callback(null, {
                status: 1,
                msg: "Order Details Not able to add",
                data: [],
              });
            }
          } else {
            return callback(null, {
              status: 0,
              msg: "Order Not Placed",
              data: [],
            });
          }
        }
      }
    );
  },
  editOrderDetails: async (data, userData, callback) => {
    var query =
      "UPDATE `trn_order`SET order_status = ?,order_updatedBy=?,order_updatedOn=NOW() WHERE order_id = ?";

    library.db.query(
      query,
      [data.orderStatus, userData.userId, data.orderId],
      async (err, response) => {
        if (err) {
          return callback(err);
        } else {
          console.log(response);
          if (response.affectedRows === 1) {
            return callback(null, {
              status: 1,
              msg: "Order Successfully Edited",
              data: [],
            });
          } else {
            return callback(null, {
              status: 0,
              msg: "Ordernot able to edit",
              data: [],
            });
          }
        }
      }
    );
  },
  cancelOrderDetails: async (data, userData, callback) => {
    var query =
      "UPDATE `trn_order`SET order_status =4,order_updatedBy=?,order_updatedOn=NOW() WHERE order_id = ?";

    library.db.query(
      query,
      [userData.userId, data.orderId],
      async (err, response) => {
        if (err) {
          return callback(err);
        } else {
          console.log(response);
          if (response.affectedRows === 1) {
            return callback(null, {
              status: 1,
              msg: "Order Successfully Canceled",
              data: [],
            });
          } else {
            return callback(null, {
              status: 0,
              msg: "Not able to cancel the order",
              data: [],
            });
          }
        }
      }
    );
  },
  orderDetails: async (data, callback) => {
    let offset = (data.pageno - 1) * data.limit;
    let Nextoffset = data.pageno * data.limit;

    let nameSorting = data.nameSorting
      ? "ORDER BY user_name " + data.nameSortOrder + ""
      : "";
    let costSorting = data.costSorting
      ? "ORDER BY order_total_amount " + data.costSortOrder + ""
      : "";
    let statusSorting = data.statusSorting
      ? "ORDER BY status_name " + data.statusSortOrder + ""
      : "";

    let searchContent = data.searchOption
      ? " AND( mas_user.user_name LIKE '%" +
        data.searchContent +
        "%' OR mas_order_status.status_name LIKE '%" +
        data.searchContent +
        "%')"
      : "";

    let query =
      "SELECT `order_id` AS orderId, trn_order.`user_id`,mas_user.user_name, `order_total_amount`, `order_payment_mode`, `order_collect_amount`, `order_status`,mas_order_status.status_name, `order_createdBy`, `order_createdOn`, `order_updatedBy`, `order_updatedOn` FROM `trn_order` INNER JOIN mas_user ON mas_user.user_id = trn_order.user_id INNER JOIN mas_order_status ON mas_order_status.status_id = trn_order.order_status WHERE trn_order.`user_id` IS NOT NULL" +
      searchContent +
      " " +
      nameSorting +
      " " +
      costSorting +
      " " +
      statusSorting +
      " LIMIT ?,?;";
    // console.log(query);
    library.db.query(query, [offset, data.limit], async (err, response) => {
      if (err) {
        callback(err);
      } else {
        if (response.length > 0) {
          let nextCountQuery =
            "select count(*) as NextRowCount from (SELECT `order_id` FROM `trn_order` INNER JOIN mas_user ON mas_user.user_id = trn_order.user_id INNER JOIN mas_order_status ON mas_order_status.status_id = trn_order.order_status WHERE trn_order.`user_id` IS NOT NULL " +
            searchContent +
            " " +
            nameSorting +
            " " +
            costSorting +
            " " +
            statusSorting +
            " LIMIT ?,?) as tbl;";
          let nextCount = await nextCountOfOrdersList(
            data.limit,
            Nextoffset,
            nextCountQuery
          );

          await asyncForEach(response, async (item, i) => {
            let productDetails = await orderDetailsHandler(response[i].orderId);
            response[i].orderDetails = productDetails.data;

            if (i == response.length - 1) {
              callback(null, [{ details: response, nextCount }]);
            }
          });
        } else {
          callback(null, [{ details: [], nextCount: 0 }]);
        }
      }
    });
  },
  productCountBasedOnDate: (data, callback) => {
    var query =
      "SELECT trn_order_details.product_id AS productId,mas_product.product_name,COUNT(trn_order_details.product_id) AS countOfProductPurchased FROM `trn_order` INNER JOIN trn_order_details ON trn_order_details.order_id = trn_order.order_id INNER JOIN mas_product ON mas_product.product_id = trn_order_details.product_id WHERE DATE(order_createdOn) = DATE(?) GROUP BY trn_order_details.product_id;";

    library.db.query(query, [data.selectedDate], (err, response) => {
      if (err) {
        console.log(err);
        return callback(err);
      } else {
        return callback(null, response);
      }
    });
  },
  customerDetailsBasedOnPurchasedCount: (data, callback) => {
    var query =
      "SELECT mas_user.user_id,mas_user.user_name,COUNT(trn_order_details.product_id) AS countOfProductPurchased FROM `trn_order` INNER JOIN trn_order_details ON trn_order_details.order_id = trn_order.order_id INNER JOIN mas_user ON mas_user.user_id = trn_order.user_id ORDER BY countOfProductPurchased ASC";

    library.db.query(query, [data.selectedDate], (err, response) => {
      if (err) {
        console.log(err);
        return callback(err);
      } else {
        return callback(null, response);
      }
    });
  },
};

//function

function nextCountOfOrdersList(limit, offset, countQuery) {
  return new Promise((resolve, reject) => {
    var query = countQuery;

    library.db.query(query, [offset, limit], (err, response) => {
      if (err) {
        console.log(err);
      } else {
        resolve(response[0].NextRowCount);
      }
    });
  });
}

function orderDetailsAddingHandler(orderList, orderId) {
  return new Promise((resolve) => {
    var query = "";

    for (i in orderList) {
      query +=
        "INSERT INTO `trn_order_details`(`order_id`, `product_id`, `product_qty`, `product_amount`) VALUES ('" +
        orderId +
        "','" +
        orderList[i].productId +
        "','" +
        orderList[i].productQty +
        "','" +
        orderList[i].productAmount +
        "');";
    }

    library.db.query(query, (err, response) => {
      if (err) {
        console.log(err);
        resolve({ status: false });
      } else {
        resolve({ status: true });
      }
    });
  });
}

function deleteOrderHandler(orderId) {
  return new Promise((resolve, reject) => {
    var query = "DELETE FROM `trn_order` WHERE order_id = ?";

    library.db.query(query, [orderId], (err, response) => {
      if (err) {
        console.log(err);
        reject({ status: false });
      } else {
        resolve({ status: true });
      }
    });
  });
}

function deleteOrderDetailsHandler(orderId) {
  return new Promise((resolve, reject) => {
    var query = "DELETE FROM `trn_order_details` WHERE order_id = ?";

    library.db.query(query, [orderId], (err, response) => {
      if (err) {
        console.log(err);
        reject({ status: false });
      } else {
        resolve({ status: true });
      }
    });
  });
}

function orderDetailsHandler(orderId) {
  return new Promise((resolve, reject) => {
    var query =
      "SELECT `order_det_id` AS orderDetailsId, `order_id` AS orderId, trn_order_details.`product_id` AS productId,mas_product.product_name, trn_order_details.`product_qty` AS productQuantity, trn_order_details.`product_amount` AS productAmount FROM `trn_order_details` INNER JOIN mas_product ON mas_product.product_id = trn_order_details.product_id  WHERE order_id = ?";

    library.db.query(query, [orderId], (err, response) => {
      if (err) {
        console.log(err);
        reject({ status: false, data: [] });
      } else {
        resolve({ status: true, data: response });
      }
    });
  });
}
