const express = require("express");

const usersController = require("../controller/UsersController");
const categoryController = require("../controller/CategoryController");
const recipeController = require("../controller/RecipeController");

const { getAll, postUser, updateUser, deleteUser, getDetail } = usersController;
const { getData } = categoryController;
const {
  getRecipes,
  postRecipe,
  selectRecipes,
  getById,
  deleteRecipe,
  updateRecipe,
} = recipeController;

const router = express.Router();

// CRUD USER

router.get("/allData", getAll);
router.get("/detail/:id", getDetail);
router.post("/postUsers", postUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

// GET CATEGORY

router.get("/category", getData);

//CRUD RECIPES

router.get("/recipes", getRecipes);
router.get("/allRecipe", selectRecipes);
router.get("/recipe/:id", getById);
router.post("/postRecipe", postRecipe);
router.delete("/deleteRecipe/:id", deleteRecipe);
router.put("/updateRecipe/:id", updateRecipe);

module.exports = router;
