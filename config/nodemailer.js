const nodemailer = require('nodemailer');
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
    process.env.WYRAI_CLIENT_ID,
    process.env.WYRAI_CLIENT_SECRET,
    process.env.WYRAI_REDIRECT_URI
  );

oAuth2Client.setCredentials({ refresh_token: process.env.WYRAI_REFRESH_TOKEN });
const token = async () => {
    const ACCESS_TOKEN =  oAuth2Client.getAccessToken(); 
    return ACCESS_TOKEN
}
 

const smtp = {
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.WYRAI_EMAIL,
      clientId:  process.env.WYRAI_CLIENT_ID,
      clientSecret: process.env.WYRAI_CLIENT_SECRET,
      refreshToken: process.env.WYRAI_REFRESH_TOKEN,
      accessToken: token(),
    },
    tls: {
      rejectUnauthorized: true,
    },
}

const transporter = nodemailer.createTransport( smtp );


module.exports = {
    transport: transporter,
}


