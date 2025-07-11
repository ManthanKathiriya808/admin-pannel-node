const express= require("express")
const routes = express.Router()
const controller = require("../controllers/controller")
const photo = require("../multer/photo")
const passport = require("passport")
routes.get("/",controller.home)
routes.get("/pages/tables",passport.isAuth,controller.tables)
routes.get("/pages/profile",passport.isAuth,controller.profile)
routes.get("/pages/sign-in",controller.signin)
routes.get("/pages/sign-up",controller.signup)
routes.get("/pages/tables/delete/:id",controller.deleteUser)
routes.get("/pages/update",passport.isAuth,photo,controller.updateUser)
routes.post("/insertdata",passport.isAuth,photo,controller.insertData)
routes.post("/updatedata",photo,controller.updatedata)
routes.post("/signindata",passport.authenticate("local", {failureRedirect:'/pages/sign-in'}),controller.signindata)


module.exports = routes