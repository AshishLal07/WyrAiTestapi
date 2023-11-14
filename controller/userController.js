const User = require("../models/User.js");
const Otp = require('../models/Otp.js');
const {randomInt} = require('node:crypto');
const otpMailer = require('../mail/otp_mailer.js');
const bcrypt = require('bcrypt');


async function generateOtp(email) {
   
      
    
}


module.exports.generateOtp = async(req,res) => {
    
    try {
        const {email} = req.body;

        const otp = randomInt(1000, 9999);

        const expiresIn = 10 * 60 * 1000; // OTP expires in 10 minutes

        // Store OTP and email in temporary store with an expiry
        await Otp.create({ email, otp});


        otpMailer.otpverify(email,otp);
        // console.log(email, otp);
        
        return res.status(200).json("Otp send successfull");
        
    } catch (error) {
        return res.status(404).json('Error while sending mail')   
    }


}

module.exports.userRegister = async (req,res) => {
    try {
        console.log(req.body);
        const {data, otp} = req.body;
        const verifyOtp = otp.join('');

        console.log(verifyOtp)
        if(data.password != data.confirmPassword){
           return res.status(422).json({ error: "password not match" });
        }

         console.log(verifyOtp)
        // const hashPassword = await bcrypt.hashSync(data.password,saltRound);
        const tempUser = await Otp.find({ email:data.email });

        console.log(tempUser,tempUser[0].otp, verifyOtp);

         // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash password with the salt
        const hash = await bcrypt.hash(data.password, salt);

        if (tempUser && tempUser[0].otp === verifyOtp ) {
            // OTP is correct and within the valid time frame
            // const saltRounds = await bcryct.genSalt();
             const user =  await User.create({ name:data.name,email:data.email,password:hash,phoneNumber:data.phoneNumber }); // Create the user in the main user collection
             console.log(user);

            
            await Otp.deleteOne({ email:data.email }); // Remove from temporary store
            return res.send('User successfully created!');
        } else {
            return res.status(400).send('Invalid or expired OTP!');
        }     
 
    } catch (error) {
         return res.status(401).json(error);
    }
 };
 