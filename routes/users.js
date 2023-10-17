const express = require("express")
const Router = express.Router()

const userController = require("../controllers/userController.js")

Router.post("/registerUser", userController.registerUser)
Router.post("/loginUser", userController.loginUser)

module.exports = Router 