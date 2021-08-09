require('dotenv').config();
// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

// const {
//   MAILING_SERVICE_CLIENT_ID,
//   MAILING_SERVICE_CLIENT_SECRET,
//   MAILING_SERVICE_REFRESH_TOKEN,
//   SENDER_EMAIL_ADDRESS,
// } = process.env;

// const oAuth2Client = new google.auth.OAuth2(
//   MAILING_SERVICE_CLIENT_ID,
//   MAILING_SERVICE_CLIENT_SECRET,
//   MAILING_SERVICE_REFRESH_TOKEN,
//   OAUTH_PLAYGROUND
// );
// const sendEmail = (des, url, txt) => {
//   oAuth2Client.setCredentials({
//     refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
//   });
//   const accessToken = oAuth2Client.getAccessToken();
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: "tanphat261098@gmail.com",
//       clientId: MAILING_SERVICE_CLIENT_ID,
//       clientSecret: MAILING_SERVICE_CLIENT_SECRET,
//       refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
//       accessToken,
//     },
//   });

//   const mailOptions = {
//     from: SENDER_EMAIL_ADDRESS,
//     to: des,
//     subject: "NTPSHOP!",
//     html: `
//       <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
//       <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the NTPShop.</h2>
//       <p>Congratulations! You're almost set to start using NTP✮SHOP.
//       Just click the button below to validate your email address.
//       </p>
//       <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
//       <p>If the button doesn't work for any reason, you can also click on the link below:</p>
//   `,
//   };

//   console.log(mailOptions);
//   transporter.sendMail(mailOptions, (err, infor) => {
//     if (err) return err;
//     return infor;
//   });
//   //   let info = await transporter.sendMail({
//   //     from: "NTPShop.com 😍😍",
//   //     to: "tanphat261098@gmail.com",
//   //     subject: "Reset Password!",
//   //     html: `
//   //     <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
//   //     <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the NTPShop.</h2>
//   //     <p>Congratulations! You're almost set to start using NTP✮SHOP.
//   //     Just click the button below to validate your email address.
//   //     </p>
//   //     <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
//   //     <p>If the button doesn't work for any reason, you can also click on the link below:</p>
//   // `,
//   //   });
//   //   console.log("Message sent: %s", info.messageId);
//   //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   //   // Preview only available when sending through an Ethereal account
//   //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// };

// module.exports = sendEmail;

const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

// send mail
const sendEmail = (to, subject, url, message, txt) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN
  });

  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken
    }
  });

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: `NTPSHOP ${subject}`,
    html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to SHOP.</h2>
            <p>Congratulations! You're almost set to start using NTP✮SHOP.
               
            </p>
            <p>${message}</p>

            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>

            <p>If the button doesn't work for any reason, you can also click on the link below:</p>

            <div>${url}</div>
            </div>
        `
  };

  smtpTransport.sendMail(mailOptions, (err, infor) => {
    if (err) return err;
    return infor;
  });
};

module.exports = sendEmail;
