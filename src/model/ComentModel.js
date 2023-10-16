const Pool = require("../config/db");

const getCommentById = async (recipe_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT 
        comment.comment_id,
        comment.comment_text,
        comment.user_id,
        comment.recipe_id,
        to_char(create_at, 'DD/MM/YYYY') AS formatted_create_at,
        users.name AS author,
        users.photo AS author_photo
    FROM 
        comment
    JOIN 
        users ON comment.user_id = users.id WHERE recipe_id=${recipe_id}`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const postComment = async (data) => {
  const { recipe_id, user_id, comment_text } = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO comment (recipe_id, user_id, comment_text, create_at)
        VALUES ('${recipe_id}', '${user_id}', '${comment_text}', CURRENT_TIMESTAMP);
        `,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const putComment = async (data, id) => {
  const { comment_text, comment_id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE comment
        SET comment_text = '${comment_text}'
        WHERE comment_id = '${comment_id}';
        `,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const deleteComment = async (comment_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM comment
        WHERE comment_id = '${comment_id}';`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

module.exports = {
  getCommentById,
  postComment,
  putComment,
  deleteComment,
};
