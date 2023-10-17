const mongoose = require("mongoose")
const db = require("../db/db")
const Category = db.Mongoose.model('category', db.categorySchema, 'category')

const categoryInsert = async(req, res) => {
    const {categoryName} = req.body;
    const category = await Category.create({categoryName})
    category.save()
}

const categoryList = async(req, res) =>{
    const response = await Category.find({})
    const list = response.sort((a,b) => a.categoryName.localeCompare(b.categoryName))
    /*list.forEach(item =>{
        item.categoryName = item.categoryName.toUpperCase()
    })*/
    res.json(list)
}

const categoryDelete = async(req, res)=>{
    const _id = req.params.id
    const card = await Category.findOneAndDelete({_id: _id})
    res.json(card)
}

module.exports = {categoryInsert, categoryList, categoryDelete}