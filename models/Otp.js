const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    otp:String,
    email:{type:String, unique:true},
    createdAt:{
        type:Date,
        expire:3600,
        default: Date.now()
    }

});

const Otp = mongoose.model("Otp",otpSchema);

module.exports = Otp;