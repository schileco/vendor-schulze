const mongoose = require("mongoose")
const db = require("../db/db")
const Vendor = db.Mongoose.model('vendor', db.vendorSchema, 'vendor')

const vendorInsert = async(req, res) => {
    const {vendorName, vendorCNPJ, vendorContact, vendorTelephone, vendorEmail, vendorState, vendorCounty, vendorCategory} = req.body;
    const vendor = await Vendor.create({vendorName, vendorCNPJ, vendorContact, vendorTelephone, vendorEmail, vendorState, vendorCounty, vendorCategory})
    vendor.save()
}

const listVendor = async (req, res)=>{
    const vendorCategory = req.params.category
    console.log(vendorCategory)
    const vendor = await Vendor.find({vendorCategory : vendorCategory })
    res.json(vendor)
}

const updateVendor = async(req,res)=>{
    const vendorId = req.params.id

    const vendor = await Vendor.findOneAndUpdate({_id : vendorId}, {$set: req.body})
    console.log(vendor)
}

const deleteVendor = async(req, res)=>{
    const vendorId = req.params.id
    const vendor = await Vendor.deleteOne({_id: vendorId})
    res.json(vendor)
}

const searchState = async(req, res) => {
    const vendorCategory = req.params.category
    const {vendorState} = req.body
    const results = await Vendor.find({vendorState:vendorState,vendorCategory:vendorCategory})
    console.log("API responde", results)
    res.json(results)
}

module.exports = {vendorInsert, listVendor, deleteVendor,
                  updateVendor, searchState}