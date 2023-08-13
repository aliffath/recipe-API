const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "recipe",
    format: async (req, file) => "png",
    public_id: (req, file) => {
      const filename = new Date().getTime().toString();
      return filename;
    },
  },
});

const limits = {
  fileSize: 2 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  const allowedFormats = ["image/jpg", "image/jpeg", "image/png"];
  if (!allowedFormats.includes(file.mimetype)) {
    return cb(Error("fileformat_error"));
  }
  cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });

const uploadMiddleware = (field) => {
  const uploadField = upload.single(field);
  return (req, res, next) => {
    uploadField(req, res, (err) => {
      try {
        if (err) {
          if (err.message === "fileformat_error") {
            throw Error("fileformat_error");
          }
          throw Error(err.message);
        }
        return next();
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error & File size to large",
        });
      }
    });
  };
};

module.exports = uploadMiddleware;
