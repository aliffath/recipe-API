const express = require("express");

const usersController = require("../controller/UsersController");
const categoryController = require("../controller/CategoryController");
const recipeController = require("../controller/RecipeController");
const authController = require("../controller/AuthController");
const { verifyToken } = require("../middleware/verifytoken");

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

const { login, register } = authController;

const router = express.Router();

//AUTH

router.post("/register", register);
router.post("/login", login);

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
router.get("/recipe/:id", verifyToken, getById);
router.post("/postRecipe", verifyToken, postRecipe);
router.delete("/deleteRecipe/:id", verifyToken, deleteRecipe);
router.put("/updateRecipe/:id", verifyToken, updateRecipe);

module.exports = router;
