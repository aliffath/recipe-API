const Pool = require("../config/db");

const categoryModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      Pool.query(`SELECT * FROM category`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = categoryModel;
