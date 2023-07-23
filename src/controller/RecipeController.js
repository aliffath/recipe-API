const recipeModel = require("../model/RecipeModel");

const recipeController = {
  getRecipes: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortBY = req.query.sortBY || "id";
      const sort = req.query.sort || "";
      const searchParam = req.query.search ? req.query.search : "";
      const result = await recipeModel.selectAllRecipe(
        limit,
        offset,
        searchParam,
        sortBY,
        sort
      );

      const dataRecipeCount = await recipeModel.coutData();

      const pagination = {
        totalPage: Math.ceil(dataRecipeCount.rows[0].count / limit),
        totalData: parseInt(dataRecipeCount.rows[0].count),
        pageNow: parseInt(page),
      };

      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "Result not found", pagination });
      }

      res.status(200).json({
        message: "Get recipes sucessfully",
        data: result.rows,
        pagination,
      });
    } catch (error) {
      res.status(500).json({ message: "Get recipes pagination failed", error });
    }
  },

  selectRecipes: async (req, res) => {
    try {
      const data = await recipeModel.allRecipe();
      res
        .status(200)
        .json({ message: "Get all recipe succesfully", data: data.rows });
    } catch (error) {
      res.status(500).json({ server_error: error });
    }
  },

  getById: async (req, res) => {
    const id = req.params.id;
    try {
      const detail = await recipeModel.findById(id);
      if (detail && detail.rows.length > 0) {
        res.status(200).json({
          message: "Berhasil mendapatkan detail resep",
          data: detail.rows,
        });
      } else {
        res.status(404).json({ error: "Data not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Get recipes failed" });
    }
  },

  postRecipe: async (req, res) => {
    const { title, ingredients, category_id, image } = req.body;
    try {
      await recipeModel.createRecipe({
        title,
        ingredients,
        image,
        category_id: parseInt(category_id),
      });
      res.status(200).json({
        message: "Create recipe success",
        data: { title, ingredients, image, category_id },
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to create Recipe" });
    }
  },

  deleteRecipe: async (req, res) => {
    const id = req.params.id;
    try {
      await recipeModel.destroy(id);
      res.status(200).json({
        message: "Delete recipes sucessfully",
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete Recipe" });
    }
  },

  updateRecipe: async (req, res) => {
    const { title, ingredients, image, category_id } = req.body;
    const { id } = req.params;

    try {
      await recipeModel.update({ id, title, ingredients, image, category_id });
      res.status(200).json({
        message: "Update recipe Successfully",
        data: { title, ingredients, image, category_id },
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to update Recipe" });
    }
  },
};

module.exports = recipeController;
