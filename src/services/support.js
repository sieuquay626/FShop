require('dotenv').config();
const jwt = require('jsonwebtoken');

const validateEmail = email => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const createActivationToken = user => {
  console.log(process.env.ACTIVATION_TOKEN_SECRET);
  return jwt.sign(user, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '5m'
  });
};

const createAccessToken = user => {
  console.log(process.env.ACCESS_TOKEN_SERECT);
  return jwt.sign(user, process.env.ACCESS_TOKEN_SERECT, {
    expiresIn: '1d'
  });
};
const createRefreshToken = user => {
  console.log(process.env.REFRESH_TOKEN_SECRECT);
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRECT, {
    expiresIn: '1d'
  });
};

const replaceVN = str => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/ /g, '-');
  str = str.replace(/\./g, '-');
  return str;
};

const displayMoney = n => {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return format.format(n);
};
module.exports = {
  validateEmail,
  createActivationToken,
  createAccessToken,
  createRefreshToken,
  replaceVN,
  displayMoney
};
