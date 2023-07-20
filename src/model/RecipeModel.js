const Pool = require("../config/db");

const recipeModel = {
  allRecipe: () => {
    return new Promise((resolve, reject) => {
      Pool.query(
        `SELECT recipe.id, recipe.title, recipe.ingredients, recipe.image, category.name AS category FROM recipe JOIN category ON recipe.category_id = category.id`,
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

  selectAllRecipe: async (limit, offset, searchParam, sortBY, sort) => {
    let query = `SELECT recipe.id, recipe.title, recipe.ingredients, recipe.image, category.name AS category FROM recipe JOIN category ON recipe.category_id = category.id WHERE title ILIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`;
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

  createRecipe: ({ title, ingredients, image, category_id }) => {
    return new Promise((resolve, reject) => {
      Pool.query(
        `INSERT INTO  recipe (title,ingredients,image,category_id) VALUES ('${title}','${ingredients}', '${image}', ${category_id})`,
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
      Pool.query(
        `SELECT recipe.id, recipe.title, recipe.ingredients, recipe.image, category.name AS category FROM recipe JOIN category ON recipe.category_id = category.id WHERE recipe.id = ${id}`,

        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  destroy: (id) => {
    return new Promise((resolve, reject) => {
      Pool.query(`DELETE FROM recipe WHERE id = ${id}`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  update: ({ id, title, ingredients, image, category_id }) => {
    return new Promise((resolve, reject) => {
      Pool.query(
        `UPDATE recipe SET title = '${title}', ingredients = '${ingredients}', image = '${image}', category_id = '${category_id}' WHERE id = ${id}`,
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
