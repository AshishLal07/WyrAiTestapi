const express = require("express");

const Router = express.Router();
// const taskController = require("../controller/taskController.js");
const userController = require('../controller/userController.js');

Router.post("/register", userController.userRegister);
Router.post("/otpGen", userController.generateOtp);
Router.post("/verifyOtp", userController.userRegister);

// Router.get("/show", taskController.showTask);
// Router.get("/delete/:id", taskController.destroy);
// Router.get("/toggleReminder/:id", taskController.toggle);

module.exports = Router;
