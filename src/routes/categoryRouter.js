const router = require('express').Router();
const categoryCtrl = require('../controllers/categoryCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router
  .route('/')
  .get(categoryCtrl.listCategory)
  .post(categoryCtrl.createCategory)
  .put(categoryCtrl.updateCategory)
  .delete(categoryCtrl.removeCategory);

router.get('/search/:value', categoryCtrl.searchCategory);
module.exports = router;
