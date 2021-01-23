module.exports = {
  requestContentValidation: (requestData) => {
    console.log(requestData);
    try {
      var validationStatus = true;
      var Errors = [];
      var responseJson = {};
      console.log(
        "🚀 ~ file: bodyValidation.js ~ line 8 ~ responseJson",
        responseJson
      );

      if (Object.keys(requestData).length > 0) {
        Object.entries(requestData).map((bodyKey, i) => {
          if (
            typeof bodyKey[1] == null ||
            bodyKey[1] == undefined ||
            bodyKey[1] === ""
          ) {
            Errors.push(`${bodyKey[0]} is empty or incorrect`);
            validationStatus = false;
          } else {
            bodyKey[i];
          }
        });
      } else {
        Errors.push("Request Body is empty");
        validationStatus = false;
      }
      if (!validationStatus) {
        responseJson.status = 0;
        responseJson.msg = "Invalida Request Body";
        responseJson.data = Errors;
        return responseJson;
      } else {
        responseJson.status = 1;
        responseJson.msg = "Body Validation Success";
        responseJson.data = [];
        return responseJson;
      }
    } catch (err) {
      responseJson.status = 0;
      responseJson.msg = "Invalida Request Body";
      responseJson.data = "internal error";

      return responseJson;
    }
  },
};
