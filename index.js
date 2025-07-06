const express  = require("express")
const path = require("path")
const app = express()
const db = require("./config/db")
const port = 4000
const userTbl = require("./models/userTbl")
const multer = require("multer")
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))

app.use("/",express.static(path.join(__dirname,"/public")))
app.use("/uploads",express.static(path.join(__dirname,"/uploads")))

app.use("/", require("./routes/admin"))


app.listen(port,(err)=>{
    if(err){
        console.log(err)
        return false
    }

    console.log("Server is running at port " + port)
})