const {
  getCommentById,
  postComment,
  putComment,
  deleteComment,
} = require("../model/ComentModel");

const CommentController = {
  getDataById: async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);

      if (!id || id <= 0 || isNaN(id)) {
        return res.status(404).json({ message: "recipe not found" });
      }

      let dataCommentId = await getCommentById(parseInt(id));

      if (!dataCommentId.rows[0]) {
        return res
          .status(200)
          .json({ status: 200, message: "comment not found", data: [] });
      }

      return res.status(200).json({
        status: 200,
        message: "get comment success",
        data: dataCommentId.rows,
      });
    } catch (err) {
      return res.status(404).json({ status: 404, message: err.message });
    }
  },

  postData: async (req, res, next) => {
    try {
      const { recipe_id, user_id, comment_text } = req.body;
      console.log(req.body);

      if (!comment_text) {
        return res.status(404).json({ message: "Comment text required" });
      }
      let data = {
        recipe_id: recipe_id,
        user_id: user_id,
        comment_text: comment_text,
      };

      console.log("data");
      console.log(data);
      let result = await postComment(data);
      console.log(result);

      return res
        .status(200)
        .json({ status: 200, message: "Comment success", data });
    } catch (err) {
      return res.status(404).json({ status: 404, message: err.message });
    }
  },

  putData: async (req, res, next) => {
    try {
      const { comment_id } = req.params;
      const { comment_text } = req.body;

      if (!comment_id || comment_id <= 0 || isNaN(comment_id)) {
        return res.status(404).json({ message: "id wrong" });
      }

      let dataCommentId = await getCommentById(parseInt(id));
      if (dataCommentId.rowCount === 0) {
        return res
          .status(404)
          .json({ status: 404, message: "Comment not found" });
      }
      let data = {
        comment_text: comment_text || dataCommentId.rows[0].comment_text,
      };

      let result = await putComment(data, id);

      return res
        .status(200)
        .json({ status: 200, message: "update comment success", data });
    } catch (err) {
      return res.status(404).json({ status: 404, message: err.message });
    }
  },

  deleteCommentById: async (req, res, next) => {
    try {
      const { comment_id } = req.params;

      if (!comment_id || comment_id <= 0 || isNaN(comment_id)) {
        return res.status(404).json({ message: "comment not found" });
      }

      let result = await deleteComment(parseInt(category_id));
      console.log(result);
      if (result.rowCount == 0) {
        throw new Error("delete failed");
      }
      return res.status(200).json({
        status: 200,
        message: "delete comment success",
        data: result.rows[0],
      });
    } catch (err) {
      return res.status(404).json({ status: 404, message: err.message });
    }
  },
};

module.exports = CommentController;
