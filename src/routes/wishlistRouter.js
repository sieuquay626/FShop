const router = require('express').Router();
const wishlistCtrl = require('../controllers/wishlistCtrl');

router.get('/wishlist', wishlistCtrl.listWishlist);
router.post('/wishlist/add', wishlistCtrl.addToWishlist);
router.post('/wishlist/remove', wishlistCtrl.removeToWishlist);

module.exports = router;
