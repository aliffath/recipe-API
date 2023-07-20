const Pool = require("../config/db");

const usersModel = {
  allUsers: () => {
    return new Promise((resolve, reject) => {
      Pool.query(`SELECT * FROM users`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      Pool.query(`SELECT * FROM users WHERE id = ${id}`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  create: ({ name, email, phone, password }) => {
    return new Promise((resolve, reject) => {
      Pool.query(
        `INSERT INTO users (name,email,phone,password) VALUES ('${name}','${email}','${phone}','${password}')`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  updateUsers: ({ id, name, email, phone }) => {
    return new Promise((resolve, reject) => {
      Pool.query(
        `UPDATE users SET name = '${name}', email = '${email}', phone = '${phone}' WHERE id = ${id} `,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  destroy: (id) => {
    return new Promise((resolve, reject) => {
      Pool.query(`DELETE FROM users WHERE id = ${id}`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = usersModel;
