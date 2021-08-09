const router = require('express').Router();
const productCtrl = require('../controllers/productCtrl');
// const auth = require('../middleware/auth');
// const authAdmin = require('../middleware/authAdmin');

router.route('/').get(productCtrl.listProduct).post(productCtrl.createProduct);

// router.get('/popular', productCtrl.popular);
// router.get('/arrival', productCtrl.arrival);
// router.get('/toprated', productCtrl.popular);
router.get('/gender', productCtrl.gender);
router.get('/gender/category', productCtrl.getCategoryByGender);
router.get('/test', productCtrl.avgRating);
router.get('/allproduct', productCtrl.allProduct);
router
  .route('/:id')
  .get(productCtrl.getProductById)
  .delete(productCtrl.deleteProduct)
  .put(productCtrl.updateProduct);
module.exports = router;
