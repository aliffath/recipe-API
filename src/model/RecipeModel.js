const Pool = require("../config/db");

const recipeModel = {
  allRecipe: () => {
    return new Promise((resolve, reject) => {
      Pool.query(
        `SELECT recipe.id, recipe.title, recipe.ingredients, recipe.image, category.name AS category, users.name AS author FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON users_id = users.id`,
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

  selectAllRecipe: async (
    limit,
    offset,
    searchParam,
    sortBY,
    sort,
    searchBY
  ) => {
    let query = `SELECT recipe.id, recipe.title, recipe.ingredients, recipe.image, category.name AS category, users.name AS author FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON users_id = users.id WHERE ${searchBY} ILIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`;
    return new Promise((resolve, reject) => {
      Pool.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  coutData: async () => {
    return Pool.query("SELECT COUNT(*) FROM recipe");
  },

  createRecipe: ({ title, ingredients, image, category_id, users_id }) => {
    return new Promise((resolve, reject) => {
      Pool.query(
        `INSERT INTO recipe (title, ingredients, image, category_id, users_id) VALUES ($1, $2, $3, $4, $5)`,
        [title, ingredients, image, category_id, users_id],
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

  findById: (id) => {
    return new Promise((resolve, reject) => {
      Pool.query(`SELECT * FROM recipe WHERE id = ${id}`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },

  destroy: async (id) => {
    const query = "DELETE FROM recipe WHERE id = $1 RETURNING image";
    const values = [id];

    try {
      const result = await Pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  update: async ({ id, title, ingredients, image, category_id }) => {
    const query =
      "UPDATE recipe SET title = $1, ingredients = $2, image = $3, category_id = $4 WHERE id = $5 RETURNING *";
    const values = [title, ingredients, image, category_id, id];

    try {
      const result = await Pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  myRecipeCount: async (data) => {
    const { search, searchBy, id } = data;
    return new Promise((resolve, reject) =>
      Pool.query(
        `SELECT COUNT(*) FROM recipe JOIN category ON recipe.category_id = category.id WHERE users_id = ${id} AND ${searchBy} ILIKE '%${search}%'`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      )
    );
  },
  getMyRecipe: async (data) => {
    const { search, searchBy, offset, limit, id, sort } = data;
    return new Promise((resolve, reject) =>
      Pool.query(
        `SELECT recipe.id, recipe.title, recipe.ingredients, recipe.image, category.name AS category FROM recipe JOIN category ON recipe.category_id = category.id WHERE users_id = ${id} AND ${searchBy} ILIKE '%${search}%' ORDER BY create_at ${sort} OFFSET ${offset} LIMIT ${limit}`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      )
    );
  },

  getDetail: async (id) => {
    return new Promise((resolve, reject) => {
      Pool.query(
        `SELECT recipe.id, recipe.title, recipe.ingredients, recipe.image,recipe.create_at, category.name AS category, users.name AS author 
        FROM recipe 
        JOIN category ON recipe.category_id = category.id 
        JOIN users ON recipe.users_id = users.id
        WHERE recipe.id = ${id}`,

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
};

module.exports = recipeModel;
