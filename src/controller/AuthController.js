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
          message: "Email already registered, please login",
        });
      }

      const hashPassword = await argon2.hash(password);

      await userModel.create({
        email,
        password: hashPassword,
        name,
      });
      res.status(201).json({
        message: "Register Successfully",
        data: { name, email },
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
      const dataUser = user.rows[0];
      if (!user.rows[0]) {
        return res.status(404).json({
          status: 404,
          message: "Email is not registered, please register first",
        });
      }
      const verifyPassword = await argon2.verify(
        user.rows[0].password,
        password
      );
      if (!verifyPassword) {
        return res.status(401).json({
          status: 401,
          message: "The password you entered is incorrect",
        });
      }

      const token = jwt.sign(
        {
          id: user.rows[0].id,
          email: user.rows[0].email,
          name: user.rows[0].name,
          photo: user.rows[0].photo,
        },
        secretKey,
        { expiresIn: "365d" }
      );
      return res
        .status(200)
        .json({ status: 200, message: "Login Successfully", token, dataUser });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, message: "Failed to login user" });
    }
  },
};

module.exports = authController;
