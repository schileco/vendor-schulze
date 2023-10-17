const express = require('express')
const Router = express.Router()

const vendorController = require("../controllers/vendorController")

Router.post("/vendors", vendorController.vendorInsert)
Router.post("/search/:category", vendorController.searchState)
Router.get("/vendors/:category", vendorController.listVendor)
Router.delete("/vendors/:id", vendorController.deleteVendor)
Router.put("/vendors/:id", vendorController.updateVendor)

module.exports = Router