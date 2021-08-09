const router = require('express').Router();
const reviewCtrl = require('../controllers/reviewCtrl');

router.route('/').post(reviewCtrl.createReview).delete(reviewCtrl.deleteReview);

router.get('/listByUser', reviewCtrl.listByUser);
router.put('/reply', reviewCtrl.createReply);
router.put('/like', reviewCtrl.like);
router.put('/unlike', reviewCtrl.unlike);
router.get('/random_review', reviewCtrl.reviewRandom);
router.get('/check_review/:productId/:userId', reviewCtrl.checkReview);
router.post('/predict', reviewCtrl.recommentDataRating);
router.get('/:id', reviewCtrl.listReview);

module.exports = router;
