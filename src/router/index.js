const express = require("express");

const usersController = require("../controller/UsersController");
const categoryController = require("../controller/CategoryController");
const recipeController = require("../controller/RecipeController");
const authController = require("../controller/AuthController");
const { verifyToken } = require("../middleware/verifyToken");
const uploadMiddleware = require("../middleware/upload");
const CommentController = require("../controller/ComentController");
const { getAll, postUser, updateUser, deleteUser, getDetail } = usersController;
const { getData } = categoryController;
const {
  getRecipes,
  postRecipe,
  selectRecipes,
  getById,
  deleteRecipe,
  updateRecipe,
  getMyRecipe,
} = recipeController;

const { login, register } = authController;
const { getDataById, postData } = CommentController;
const router = express.Router();

//AUTH

router.post("/register", register);
router.post("/login", login);

// CRUD USER

router.put("/update/:id", uploadMiddleware("photo"), verifyToken, updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/detail/:id", verifyToken, getDetail);
router.get("/allData", getAll);
router.post("/postUsers", postUser);

// GET CATEGORY

router.get("/category", getData);

//CRUD RECIPES
router.put(
  "/updateRecipe/:id",
  verifyToken,
  uploadMiddleware("image"),
  updateRecipe
);
router.get("/recipe/:id", verifyToken, getById);
router.post("/postRecipe", uploadMiddleware("image"), verifyToken, postRecipe);
router.get("/recipes", verifyToken, getRecipes);
router.get("/allRecipe", verifyToken, selectRecipes);
router.delete("/deleteRecipe/:id", verifyToken, deleteRecipe);

router.get("/myRecipe", verifyToken, getMyRecipe);

//CRUD COMENTS

router.get("/coment/:id", getDataById);
router.post("/postComent", postData);

module.exports = router;
