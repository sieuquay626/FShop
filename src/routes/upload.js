require('dotenv').config();
const router = require('express').Router();
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

router.post('/', (req, res) => {
  try {
    const fileStr = req.body.files;
    cloudinary.v2.uploader.upload(
      fileStr,
      { folder: 'test' },
      async (err, result) => {
        if (err) throw err;
        const { public_id, url } = result;
        // removeTmp(file.tempFilePath);
        res.status(200).json({ result });
      }
    );

    // if (!req.files || Object.keys(req.files).length === 0)
    //   return res.status(400).json({ msg: 'No file were uploaded' });

    // const file = req.files.files;
    // if (file.size > 1024 * 1024) {
    //   removeTmp(file.tempFilePath);
    //   return res.status(400).json({ msg: 'Size to large' });
    // }

    // if (
    //   file.mimetype !== 'image/jpeg' &&
    //   file.mimetype !== 'image/png' &&
    //   file.mimetype !== 'image/svg+xml'
    // ) {
    //   removeTmp(file.tempFilePath);
    //   return res.status(400).json({ msg: 'File format is incorrect' });
    // }

    // cloudinary.v2.uploader.upload(
    //   file.tempFilePath,
    //   { folder: 'test' },
    //   async (err, result) => {
    //     if (err) throw err;
    //     const { public_id, url } = result;
    //     removeTmp(file.tempFilePath);
    //     res.json({ result });
    //   }
    // );
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

router.delete('/', (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) res.status(400).json({ msg: 'No image selected 😒' });

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      res.json({ msg: 'Deleted image' });
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

const removeTmp = path => {
  fs.unlink(path, err => {
    if (err) throw err;
  });
};

module.exports = router;
