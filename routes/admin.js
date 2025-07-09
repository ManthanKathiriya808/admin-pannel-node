const express= require("express")
const routes = express.Router()
const controller = require("../controllers/controller")
const photo = require("../multer/photo")

routes.get("/",controller.home)
routes.get("/pages/tables",controller.tables)
routes.get("/pages/profile",controller.profile)
routes.get("/pages/sign-in",controller.signin)
routes.get("/pages/sign-up",controller.signup)
routes.get("/pages/tables/delete/:id",controller.deleteUser)
routes.get("/pages/update",photo,controller.updateUser)
routes.post("/insertdata",photo,controller.insertData)
routes.post("/updatedata",photo,controller.updatedata)
routes.post("/signindata",controller.signindata)


module.exports = routes