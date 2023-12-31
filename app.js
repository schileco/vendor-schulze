const https = require("https")
const fs = require("fs")
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const app = express()





const categoryRoutes = require("./routes/category")
const vendorRoutes = require("./routes/vendor")
const userRoutes = require("./routes/users")

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');

    next();
})

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(categoryRoutes)
app.use(vendorRoutes)
app.use(userRoutes)

app.listen(5200, ()=>{
    console.log("API")
})
try{
    https.createServer({
        cert: fs.readFileSync('SSL/code.crt'),
        key: fs.readFileSync('SSL/code.key')
    }, app).listen(5300)
}catch(error){
    console.log(error)
}
