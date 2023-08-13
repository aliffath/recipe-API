const recipeModel = require("../model/RecipeModel");
const fileRemove = require("../helper/fileRemove");

const recipeController = {
  getRecipes: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 2;
      const offset = (page - 1) * limit;
      const sortBY = req.query.sortBY || "id";
      const searchBY = req.query.searchBY || "title";
      const sort = req.query.sort || "";
      const searchParam = req.query.search ? req.query.search : "";
      const result = await recipeModel.selectAllRecipe(
        limit,
        offset,
        searchParam,
        sortBY,
        sort,
        searchBY
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

  getMyRecipe: async (req, res) => {
    try {
      const { search, searchBy, limit, sort } = req.query;
      const { id } = req.payload;

      let page = req.query.page || 1;
      let limiter = limit || 5;

      data = {
        search: search || "",
        searchBy: searchBy || "title",
        offset: (page - 1) * limiter,
        limit: limit || 5,
        sort: sort || "ASC",
        id: parseInt(id),
      };
      let dataRecipe = await recipeModel.getMyRecipe(data);
      let dataRecipeCount = await recipeModel.myRecipeCount(data);

      const pagination = {
        totalPage: Math.ceil(dataRecipeCount.rows[0].count / limiter),
        totalData: parseInt(dataRecipeCount.rows[0].count),
        pageNow: parseInt(page),
      };

      if (dataRecipe.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "Result not found", pagination });
      }

      res.status(200).json({
        message: "Get recipes sucessfully",
        data: dataRecipe.rows,
        pagination,
      });
    } catch (error) {
      console.log(error);
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
      const detail = await recipeModel.getDetail(id);
      if (detail && detail.rows.length > 0) {
        res.status(200).json({
          message: "Berhasil mendapatkan detail resep",
          data: detail.rows[0],
        });
      } else {
        res.status(404).json({ error: "Data not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Get recipes failed" });
    }
  },

  postRecipe: async (req, res) => {
    const { title, ingredients, category_id } = req.body;
    const users_id = req.payload.id;

    try {
      const imageUrl = req.file ? req.file.path : null;

      await recipeModel.createRecipe({
        title,
        ingredients,
        image: imageUrl,
        category_id,
        users_id,
      });

      return res.status(200).json({
        message: "Create recipe success",
        data: {
          title,
          ingredients,
          image: imageUrl,
          category_id,
          users_id,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create Recipe" });
    }
  },

  deleteRecipe: async (req, res) => {
    const { id } = req.params;
    try {
      const dataRecipe = await recipeModel.findById(id);

      if (dataRecipe.rows.length === 0) {
        return res.status(404).json({ message: "ID not found" });
      }

      if (req.payload.id != dataRecipe.rows[0].users_id) {
        return res.status(403).json({ message: "Recipe is not owned by you" });
      }

      if (dataRecipe.rows[0].image) {
        const file = dataRecipe.rows[0].image.slice(62);
        console.log(file);
        const deletedFile = file.slice(0, -4);
        console.log(deletedFile);
        fileRemove(deletedFile);
      }

      await recipeModel.destroy(id);

      res.status(200).json({
        message: "Delete recipe successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to delete Recipe" });
    }
  },

  updateRecipe: async (req, res) => {
    const { id } = req.params;
    const { title, ingredients, category_id } = req.body;
    let image;

    try {
      image = req.file ? req.file.path : null;
      console.log(req.file);

      if (!image) {
        return res.status(404).json({ message: "Image Path Undefined" });
      }
      const dataRecipe = await recipeModel.findById(id);
      if (dataRecipe.rows.length === 0) {
        return res.status(404).json({ message: "ID not found" });
      }

      if (req.payload.id != dataRecipe.rows[0].users_id) {
        return res.status(403).json({ message: "Recipe is not owned by you" });
      }

      if (dataRecipe.rows[0].image) {
        const file = dataRecipe.rows[0].image.slice(62);
        console.log(file);
        const deletedFile = file.slice(0, -4);
        console.log(deletedFile);
        fileRemove(deletedFile);
      }

      await recipeModel.update({
        id,
        title,
        ingredients,
        image,
        category_id,
      });

      res.status(200).json({
        message: "Update recipe successfully",
        data: {
          title,
          ingredients,
          image,
          category_id,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update Recipe" });
    }
  },
};

module.exports = recipeController;
