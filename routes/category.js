const express = require("express")
const Router = express.Router()

const CategoryController = require("../controllers/categoryController");
const userController = require("../controllers/userController")

Router.post("/categories",CategoryController.categoryInsert)
Router.get("/categories", CategoryController.categoryList)
Router.delete("/categories/:id", CategoryController.categoryDelete)

module.exports = Router;

