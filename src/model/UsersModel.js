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

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      Pool.query(
        `SELECT * FROM users WHERE email = '${email}'`,
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

  create: ({ name, email, password }) => {
    return new Promise((resolve, reject) => {
      Pool.query(
        `INSERT INTO users (name,email,password) VALUES ('${name}','${email}','${password}')`,
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

  updateUsers: ({ id, name, email }) => {
    return new Promise((resolve, reject) => {
      Pool.query(
        `UPDATE users SET name = '${name}', email = '${email}' WHERE id = ${id} `,
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
