const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const app = express()

import https from 'https'
import fs from 'fs'



const categoryRoutes = require("./routes/category")
const vendorRoutes = require("./routes/vendor")
const userRoutes = require("./routes/users")

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');

    next();
})

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(categoryRoutes)
app.use(vendorRoutes)
app.use(userRoutes)

app.listen(5200, ()=>{
    console.log("API")
})

https.createServer({
    cert: fs.readFileSync('SSL/code.crt'),
    key: fs.readFileSync('SSL/code.key')
}, app.listen(3001))