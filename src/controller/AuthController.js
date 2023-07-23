const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const secretKey = process.env.JWT_SECRET;
const userModel = require("../model/UsersModel");

const authController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ message: "Silahkan isi semua form" });
    }

    try {
      const user = await userModel.findByEmail(email);
      if (user.rows[0]) {
        return res.status(409).json({
          status: 409,
          message: "Email sudah terdaftar, silahkan login",
        });
      }

      const hashPassword = await argon2.hash(password);
      const dataUser = {
        email,
        password: hashPassword,
        name,
      };
      const newUser = await userModel.create(dataUser);
      res.status(201).json({
        message: "Register Successfully",
        newUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to register user" });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "Email dan password harus diisi dengan benar",
      });
    }

    try {
      const user = await userModel.findByEmail(email);
      if (!user.rows[0]) {
        return res.status(404).json({
          status: 404,
          message: "Email tidak terdaftar, silahkan registrasi terlebih dahulu",
        });
      }
      const verifyPassword = await argon2.verify(
        user.rows[0].password,
        password
      );
      if (!verifyPassword) {
        return res
          .status(401)
          .json({ status: 401, message: "Password yang Anda masukkan salah" });
      }

      const token = jwt.sign(
        {
          id: user.rows[0].id,
          email: user.rows[0].email,
          name: user.rows[0].name,
        },
        secretKey,
        { expiresIn: "1d" }
      );
      return res
        .status(200)
        .json({ status: 200, message: "Login Successfully", token });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, message: "Terjadi kesalahan dalam login" });
    }
  },
};

module.exports = authController;