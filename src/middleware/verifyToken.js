const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: 401, message: "login gagal, server butuh token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res
        .status(404)
        .json({ status: 404, message: "login gagal, invalid token" });
    }

    req.payload = decode;
    console.log(decode);
    next();
  });
};

module.exports = { verifyToken };
