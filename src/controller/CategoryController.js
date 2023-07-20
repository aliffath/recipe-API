const categoryModel = require("../model/CategoryModel");

const categoryController = {
  getData: async (req, res) => {
    try {
      const category = await categoryModel.getAll();
      res.status(200).json({ data: category.rows });
    } catch (error) {
      res.status(500).json({ server_error: error });
    }
  },
};

module.exports = categoryController;
