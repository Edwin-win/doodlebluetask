const library = require("../Library/library");

module.exports = {
  inventoryUploadDetails: async (fileData, userId, callback) => {
    let inventoryData =
      fileData == null
        ? []
        : Array.isArray(fileData.inventoryFile) == true
        ? fileData.inventoryFile
        : [fileData.inventoryFile];
    let inventoryFile = inventoryData;

    if (inventoryFile.length === 1) {
      let fileType = inventoryFile[0].mimetype;

      if (fileType === "text/csv") {
        let uploadInventoryDetails = await uploadInventoryDetailHandler(
          inventoryFile
        );
        if (uploadInventoryDetails.status) {
          let filePath = "./uploads/" + uploadInventoryDetails.response;

          let uploadFileToDB = await uploadFileToDBHandler(filePath, userId);

          if (uploadFileToDB.status) {
            return callback(null, {
              status: 1,
              msg: "Inventory Successfully uploaded",
              data: [],
            });
          } else {
            return callback(null, {
              status: 0,
              msg: "Inventory not able to update",
              data: [],
            });
          }
        } else {
          return callback(null, {
            status: 0,
            msg: "Please check your file type,Upload CSV files only.",
            data: [],
          });
        }
      } else {
        return callback(null, {
          status: 0,
          msg: "Please check your file type,Upload CSV files only.",
          data: [],
        });
      }
    } else {
      return callback(null, {
        status: 0,
        msg: "Please check you are uploading multiple files.",
        data: [],
      });
    }
  },
};

//function

function uploadInventoryDetailHandler(inventoryData) {
  return new Promise((resolve) => {
    library.async.forEachOf(
      inventoryData,
      function (obj, i, callback) {
        var fileName =
          "inventory" + "-" + new Date().getTime() + "-" + obj.name;

        obj.mv("./uploads/" + fileName, function (err) {
          if (err) {
            resolve({ status: false, response: "error" });
          } else {
            resolve({ status: true, response: fileName });
          }
          callback();
        });
      },
      function (err) {
        if (err) {
          console.log(err.message);
          resolve({ status: false, response: err.message });
        } else {
          console.log("CSV file updated successfully");
          resolve({ status: true, response: true });
        }
      }
    );
  });
}

function uploadFileToDBHandler(filepath, userId) {
  return new Promise((resolve) => {
    let inventoryArray = [];
    library.fs
      .createReadStream(filepath)
      .pipe(library.csv())
      .on("data", (data) => inventoryArray.push(data))
      .on("end", async () => {
        inventoryArray.forEach(async (item, i) => {
          let getExisitingInventoryDetails = await getExisitingInventoryDetailsHandler(
            inventoryArray[i].product_unique_code
          );

          if (
            getExisitingInventoryDetails.status &&
            getExisitingInventoryDetails.exisitData
          ) {
            let updatingInventoryDetails = await updatingInventoryDetailsHandler(
              inventoryArray[i],
              userId
            );

            if (!updatingInventoryDetails.status) {
              return resolve({
                status: false,
                msg: "updating data get failed",
              });
            }
          } else if (
            getExisitingInventoryDetails.status &&
            !getExisitingInventoryDetails.exisitData
          ) {
            let insertingInventoryDetails = await insertingInventoryDetailsHandler(
              inventoryArray[i],
              userId
            );

            if (!insertingInventoryDetails.status) {
              return resolve({
                status: false,
                msg: "inserting data get failed",
              });
            }
          }

          if (i == inventoryArray.length - 1) {
            return resolve({
              status: true,
              msg: "inventory array completly executed",
            });
          }
        });
      });
  });
}

function getExisitingInventoryDetailsHandler(productUniqueCode) {
  return new Promise((resolve) => {
    let query =
      "SELECT product_id,product_unique_code FROM `mas_product` WHERE product_unique_code =  ?";

    library.db.query(query, [productUniqueCode], (err, response) => {
      if (err) {
        console.log(err.message);
        resolve({ status: false });
      } else {
        if (response.length === 1) {
          resolve({ status: true, exisitData: true });
        } else {
          resolve({ status: true, exisitData: false });
        }
      }
    });
  });
}

function updatingInventoryDetailsHandler(inventoryDetails, userId) {
  return new Promise((resolve) => {
    const {
      product_unique_code,
      product_name,
      product_description,
      product_qty,
      product_amount,
      product_status,
    } = inventoryDetails;

    let query =
      "UPDATE `mas_product` SET `product_name`=?,`product_description`=?,`product_qty`=?,`product_amount`=?,`product_status`=?,`product_updated_on`=NOW(),`product_upadted_by`=? WHERE `product_unique_code`= ?";

    library.db.query(
      query,
      [
        product_name,
        product_description,
        product_qty,
        product_amount,
        product_status,
        userId,
        product_unique_code,
      ],
      (err, response) => {
        if (err) {
          console.log(err.message);
          resolve({ status: false });
        } else {
          if (response.affectedRows === 1) {
            resolve({ status: true });
          } else {
            resolve({ status: false });
          }
        }
      }
    );
  });
}

function insertingInventoryDetailsHandler(inventoryDetails, userId) {
  return new Promise((resolve) => {
    const {
      product_unique_code,
      product_name,
      product_description,
      product_qty,
      product_amount,
      product_status,
    } = inventoryDetails;

    let query =
      "INSERT INTO `mas_product`(`product_unique_code`, `product_name`, `product_description`, `product_qty`, `product_amount`, `product_status`, `product_created_on`, `product_created_by`) VALUES (?,?,?,?,?,?,NOW(),?)";

    library.db.query(
      query,
      [
        product_unique_code,
        product_name,
        product_description,
        product_qty,
        product_amount,
        product_status,
        userId,
      ],
      (err, response) => {
        if (err) {
          console.log(err.message);
          resolve({ status: false });
        } else {
          if (response.affectedRows === 1) {
            resolve({ status: true });
          } else {
            resolve({ status: false });
          }
        }
      }
    );
  });
}
