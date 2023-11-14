const nodemailer = require('../config/Nodemailer.js');


exports.otpverify = (email ,otp) => {
    let mailerOption = {
        from:process.env.WYRAI_EMAIL,
        to:email,
        subject:"OTP verification",
        html:`<h1>Action Required: One-Time Verification Code</h1>
            <p>Please Enter the following code for verification <b>${otp}</b>
        `,

    };
    nodemailer.transport.sendMail(mailerOption,(error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      })
}