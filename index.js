const express =  require('express');
const cors = require('cors');
require('dotenv').config()
const db = require('./config/mongoose.js')
const router = require('./router/index.js');
// const cookieParser = require('cookie-parser');
const path = require('path');
const crypto = require('node:crypto');
const Port = process.env.PORT;
const app = express();

// app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))







app.use('/', router);

// ASINUZtYQEL1qUMh

app.listen( Port || 3000, function(){
    console.log("Server is running on the Port: ", Port)
})

