const mongoose = require("mongoose")

const mongoURI = "mongodb+srv://vendorschulze:lEWRTMJNijcjM4a8@cluster0.qpe3lbr.mongodb.net/vendor?retryWrites=true&w=majority"

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const categorySchema = new mongoose.Schema({
    categoryName: String
}, {collection: 'category'});


const vendorSchema = new mongoose.Schema({
    vendorName: String,
    vendorCNPJ: Number,
    vendorContact: String,
    vendorTelephone: String,
    vendorEmail: String,
    vendorState: String,
    vendorCounty: String,
    vendorCategory: String

}, {collection: 'vendor'});

const userSchema = new mongoose.Schema({
    userFirstName: String,
    userLastName:String,
    userPassword:String,
    userPhone:String,
    creatAt:Date
}, {collection:"user"})

module.exports = {  Mongoose:mongoose,
                    categorySchema:categorySchema,
                    vendorSchema:vendorSchema,
                    userSchema
                }