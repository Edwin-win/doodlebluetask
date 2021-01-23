const library = require("../Library/library");

module.exports = {
  userLogin: (data, callback) => {
    var query =
      "SELECT user_id,user_type,user_name,user_password FROM `mas_user` WHERE user_email = '" +
      data.userEmail +
      "';";
    library.db.query(query, (err, response) => {
      if (err) {
        console.log(err);
        return callback(err);
      } else {
        return callback(null, response);
      }
    });
  },

  getUserInfo: (userId, callback) => {
    var query =
      "SELECT `user_name` AS userName, `user_phoneno` AS userPhoneNo, `user_email` AS userEmail FROM `mas_user` WHERE `user_id` = ?;";

    library.db.query(query, [userId], (err, response) => {
      if (err) {
        console.log(err);
        return callback(err);
      } else {
        return callback(null, response);
      }
    });
  },
  userRegistration: async (data, callback) => {
    const salt = await library.bcrypt.genSalt(10);
    const userPassword = data.userPassword;
    const hashPassword = await library.bcrypt.hashSync(userPassword, salt);

    const { userType, userName, userPhoneNo, userEmail } = data;

    var query =
      "INSERT INTO `mas_user`(`user_type`, `user_name`, `user_phoneno`, `user_email`, `user_password`, `user_active_status`) VALUES (?,?,?,?,?,?);";

    library.db.query(
      query,
      [userType, userName, userPhoneNo, userEmail, hashPassword, 1],
      (err, response) => {
        if (err) {
          console.log(err);
          return callback(err);
        } else {
          return callback(null, response);
        }
      }
    );
  },
};
