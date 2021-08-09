const router = require('express').Router();
const { orderById } = require('../controllers/orderCtrl');
const orderCtrl = require('../controllers/orderCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.route('/').get(orderCtrl.getStatusValues).post(orderCtrl.createOder);

router.get('/allorder', orderCtrl.listOrders);
router.get('/byuser/:id', orderCtrl.orderByUser);
router.post('/cancel', orderCtrl.cancelStatusOrder);
router.get('/:id', orderCtrl.orderById);
router.put('/update-status', orderCtrl.updateOrderStatus);

module.exports = router;
