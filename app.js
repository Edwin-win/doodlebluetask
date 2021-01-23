"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").Server(app);
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(fileUpload());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

//common user details
const userDetails = require("./routes/UserAuthentication/userAuthentication.router");

//inventory details
const inventoryDetails = require("./routes/InventoryUpload/inventoryUpload.router");

//order details
const orderDetails = require("./routes/Orders/orders.router");

//common user details
app.use("/api/v1/user", userDetails);

//inventoryDetails
app.use("/api/v1/inventory", inventoryDetails);

//orderDetails
app.use("/api/v1/order", orderDetails);


// runing on port
app.set("port", process.env.APP_PORT);
app.set("host", process.env.APP_HOST);
http.listen(app.get("port"), "0.0.0.0", function () {
  console.log(
    "Express server listening on port " +
      app.get("host") +
      ":" +
      app.get("port")
  );
});
