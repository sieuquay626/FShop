const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const { ObjectId } = require('mongodb');
const categoryCtrl = {
  listCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      return res.status(200).json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  searchCategory: async (req, res) => {
    try {
      const { value } = req.params;
      console.log(ObjectId.isValid(value));
      const find = ObjectId.isValid(req.params.value)
        ? [{ name: { $regex: value, $options: 'i' } }, { _id: ObjectId(value) }]
        : [{ name: { $regex: value, $options: 'i' } }];
      const categories = await Category.find({
        $or: find
      });
      return res.status(200).json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      let { name } = req.body;
      name = name.trim().toLowerCase();
      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).json({ msg: 'This category already exists' });
      const newCategory = new Category({ name });
      await newCategory.save();
      return res.status(200).json({ msg: 'Created a category', newCategory });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { category_id, name } = req.body;
      let result = await Category.findByIdAndUpdate(
        category_id,
        { name: name.trim().toLowerCase() },
        { new: true }
      );
      return res.status(200).json({ msg: 'Updated a category', result });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  removeCategory: async (req, res) => {
    const { id } = req.body;
    try {
      await Product.find({ 'detail.category': id }).then(async value => {
        if (value.length) {
          return res
            .status(400)
            .json({ msg: 'Remove products from this category first  ' });
        }
        await Category.findByIdAndDelete(id, (err, value) => {
          return res
            .status(200)
            .json({ msg: 'Delete Category Success', value });
        });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = categoryCtrl;
