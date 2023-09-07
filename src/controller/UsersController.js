const usersModel = require("../model/UsersModel");
const argon2 = require("argon2");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const usersController = {
  getAll: async (req, res) => {
    try {
      const users = await usersModel.allUsers();
      res.status(200).json({ data: users.rows });
    } catch (error) {
      res.status(500).json({ server_error: error });
    }
  },

  getDetail: async (req, res) => {
    const id = req.params.id;

    try {
      const detail = await usersModel.findById(id);
      res
        .status(200)
        .json({ message: "Get Detail Sucessfully", data: detail.rows });
    } catch (error) {
      res.status(500).json({ server_error: error });
    }
  },

  postUser: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const hash = await argon2.hash("password");
      await usersModel.create({
        name,
        email,
        password: hash,
      });
      res.status(201).json({
        message: "User Create Successfully",
        data: { name, email, password: hash },
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  },

  updateUser: async (req, res) => {
    const { name } = req.body;
    const photo = req.file.path;
    const id = req.params.id;

    try {
      await usersModel.updateUsers({ id, name, photo });
      res.status(200).json({
        message: "Update data Successfully",
        data: { name, photo },
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      await usersModel.destroy(id);
      res.status(200).json({
        message: "Delete data Successfully",
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  },
};

module.exports = usersController;
