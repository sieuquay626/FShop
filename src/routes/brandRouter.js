const router = require('express').Router();
const brandCtrl = require('../controllers/brandCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router
  .route('/')
  .get(brandCtrl.listBrand)
  .post(brandCtrl.createBrand)
  .put(brandCtrl.updateBrand)
  .delete(brandCtrl.removeBrand);
router.get('/search/:value', brandCtrl.searchBrand);

module.exports = router;
