const router = require('express').Router();
const { logging } = require('googleapis/build/src/apis/logging');
const passport = require('passport');
const service = require('../services/support');

const isLoggedIn = (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

//GOOGLE
router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

// router.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     successRedirect: '/user/login/success',
//     failureRedirect: '/user/login/failure'
//   })
// );
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  console.log(req);
  // const user = JSON.parse(JSON.stringify(req.user)); // hack
  // const cleanUser = Object.assign({}, user);
  // if (cleanUser.local) {
  //   console.log(`Deleting ${cleanUser.local.password}`);
  //   delete cleanUser.local.password;
  // }
  // res.json({ user: req.user });
  res.redirect('http://localhost:3000');
});

router.get('/logout', (req, res) => {
  if (req.user) {
    req.session = null;
    req.user = null;
    res.clearCookie('connect.sid'); // clean up!
    res.clearCookie('session.sig');
    res.clearCookie('session');
    req.logout();
    return res.status(200).json({ msg: 'The account has been logout' });
  } else {
    return res.status(400).json({ msg: 'No user to log out!' });
  }
  // req.logout();
  // req.session = null;
  // req.user = null;
  // res.status(200).json({ msg: `Account ${email} is logout` });
});

module.exports = router;
