const express  = require("express")
const path = require("path")
const app = express()
const db = require("./config/db")
const port = 4000
const session = require("express-session")
const userTbl = require("./models/userTbl")
const multer = require("multer")
const cookieParser = require('cookie-parser')
const localst = require("./middleware/pls")
const passport = require("passport")
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))

app.use("/",express.static(path.join(__dirname,"/public")))
app.use("/uploads",express.static(path.join(__dirname,"/uploads")))
app.use(cookieParser())

app.use(session({
    name:"admin",
    secret:"secret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60
    }
}))


app.use(passport.session())
app.use(passport.initialize())
app.use(passport.userAuth)

app.use("/", require("./routes/admin"))




app.listen(port,(err)=>{
    if(err){
        console.log(err)
        return false
    }

    console.log("Server is running at port " + port)
})