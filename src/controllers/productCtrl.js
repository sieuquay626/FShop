const Product = require('../models/productModel');
const Review = require('../models/reviewModel');

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query
    const excludedFields = ['page', 'sort', 'limit'];
    excludedFields.forEach(el => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      match => '$' + match
    );
    // //    gte = greater than or equal
    // //    lte = lesser than or equal
    // //    lt = lesser than
    // //    gt = greater than
    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  paginating() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 12;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productCtrl = {
  listProduct: async (req, res) => {
    try {
      const features = new APIfeatures(
        Product.find().populate('detail.category').populate('detail.brand'),
        req.query
      ).filtering();
      const total = await features.query;
      const products = await features.sorting().paginating().query;
      return res.status(200).json({
        total_result: total.length,
        products: products,
        total_product: products.length
      });
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  },
  allProduct: async (req, res) => {
    try {
      Product.find()
        .populate('detail.category')
        .populate('detail.brand')
        .then(products => {
          return res.status(200).json({ products });
        });
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  },
  getProductById: async (req, res) => {
    let id = req.params.id;
    Product.findById(id)
      .populate('detail.category')
      .populate('detail.brand')
      .exec((err, product) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(product);
      });
  },
  createProduct: async (req, res) => {
    console.log('vao');
    try {
      let {
        title,
        image,
        description,
        currency,
        price,
        discount,
        brand,
        material,
        gender,
        category
      } = req.body;
      if (!title) return res.status(400).json({ msg: 'Title is required' });
      if (!image) return res.status(400).json({ msg: 'No image upload' });
      const product = await Product.findOne({ title });
      if (product)
        return res.status(400).json({ msg: 'This product already exists' });
      const newProduct = new Product({
        title: title.trim().toLowerCase(),
        image,
        description,
        currency,
        price,
        discount
      });
      // if (color) {
      //   color = color.split(',');
      //   newProduct.detail.color = color;
      // }
      (newProduct.detail.brand = brand),
        (newProduct.detail.material = material || ''),
        (newProduct.detail.gender = gender || 'General'),
        (newProduct.detail.category = category);
      await newProduct.save();
      return res
        .status(200)
        .json({ msg: 'Created Product Succesful', newProduct });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      return res.status(200).json({ msg: 'Deleted a Product' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      let {
        title,
        price,
        description,
        image,
        category,
        brand,
        gender,
        currency,
        discount,
        material
      } = req.body;
      console.log(req.body);
      const id = req.params.id;
      await Product.find({ title }, (err, existProduct) => {
        if (existProduct.length > 1) {
          return res
            .status(400)
            .json({ msg: 'The title already exists', existProduct });
        }
      });
      const product = await Product.findById(req.params.id);
      title && (product.title = title);
      price && (product.price = price);
      discount && (product.discount = discount);
      currency && (product.currency = currency);
      image && (product.image = image);
      description && (product.description = description);
      material && (product.detail.material = material);
      gender && (product.detail.gender = gender);
      category && (product.detail.category = category);
      brand && (product.detail.brand = brand);
      product.save();
      return res.status(200).json({ msg: 'Updated Product Success', product });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getCategoryByGender: async (req, res) => {
    try {
      const men = await Product.distinct('detail.category', {
        'detail.gender': 'Men'
      });
      const kid = await Product.distinct('detail.category', {
        'detail.gender': 'Kid'
      });
      const women = await Product.distinct('detail.category', {
        'detail.gender': 'Women'
      });
      return res.status(200).json({ men, women, kid });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  gender: async (req, res) => {
    const { gender, page = 1, limit = 12 } = req.body;
    try {
      const result = await Product.find({ 'detail.gender': gender });
      return res.status(200).json({ msg: 'Gender product', result });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  avgRating: async (req, res) => {
    let rateCount = [];
    let avgRating = 0;
    const products = await Product.find();
    products.map(async product => {
      await Review.aggregate(
        [
          { $match: { _id: { $in: product.rating } } },
          { $group: { _id: product._id, average: { $avg: '$rating' } } }
        ],
        (err, result) => {
          if (result.length) {
            avgRating = Number(Math.round(result[0].average));
            console.log(avgRating);
            product.avgRating = avgRating;
            product.save();
          }
        }
      );
    });
    res.status(200).json({ rateCount, total: rateCount.length });
  }
};

module.exports = productCtrl;
