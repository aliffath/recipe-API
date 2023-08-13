const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ status: 401, message: "login gagal, server butuh token" });
    }
    let decode = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    req.payload = decode;
    next();
  } catch (error) {
    console.error("error", error);
    return res.status(404).json({ status: 404, message: "Invalid token" });
  }
};

module.exports = { verifyToken };
