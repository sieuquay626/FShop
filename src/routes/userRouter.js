const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const passport = require('passport');

router.post('/register', userCtrl.register);
router.get('/activation/:activation_token', userCtrl.activateEmail);
router.get('/login', function (req, res) {
  if (req.isAuthenticated()) {
    return res.status(200).json('Account is logged');
  }
  return res.status(200).json('Account is not logged');
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  // console.log('POST to /login');
  const user = JSON.parse(JSON.stringify(req.user)); // hack
  const cleanUser = Object.assign({}, user);
  if (cleanUser.local) {
    console.log(`Deleting ${cleanUser.local.password}`);
    delete cleanUser.local.password;
  }
  res.json({ user: cleanUser });
});

router.get('/getuser', (req, res) => {
  req.isAuthenticated();
  // const user = JSON.parse(JSON.stringify(req.user)); // hack
  // const cleanUser = Object.assign({}, user);
  // console.log(cleanUser);
  // if (cleanUser.local) {
  //   console.log(`Deleting ${cleanUser.local.password}`);
  //   delete cleanUser.local.password;
  // }
  res.status(200).json({ user: req.user });
});

router.get('/login/failure', (req, res) => {
  console.log(res);
  res.json({ msg: 'Login failed', info: req.msg });
});
router.get('/login/success', (req, res) => {
  res.status(200).json({ data: req.user });
  // res.json({ msg: `Login success , Welcome mr ${req.user.email}` });
});

router.get('/profile', userCtrl.getProfile);

// router
//   .route('/profile/:id')
//   // .get(userCtrl.getProfile)
//   // .delete(userCtrl.deleteProfile)
//   .put(userCtrl.updateProfile);

router.route('/profile/:id').put(userCtrl.updateProfile);
router.route('/forgotpassword').post(userCtrl.forgotPassword);

router.route('/resetpassword/:resetToken').put(userCtrl.resetPassword);
router.put('/changepassword', userCtrl.changePassword);

router.get('/list_user', userCtrl.getAllUser);
router.post('/create_admin', userCtrl.createAdmin);
router.get('/data_user', userCtrl.dataUser);
router.get('/:user_id', userCtrl.getUser);
router.delete('/:user_id', userCtrl.deleteUser);
module.exports = router;
