const express = require("express");
const route = express.Router();
const { registerController, loginController, currUser } = require("../controller/authController");
const authMiddleware = require("../middlewares/authMiddleware");

route.post('/register', registerController)

route.post('/login', loginController)

route.get('/current_user', authMiddleware, currUser);

module.exports = route;