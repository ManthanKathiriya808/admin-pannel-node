const express= require("express")
const routes = express.Router()
const controller = require("../controllers/controller")
const photos = require("../multer/photo")

routes.get("/",controller.home)
routes.get("/pages/tables",controller.tables)
routes.get("/pages/profile",controller.profile)
routes.get("/pages/sign-in",controller.signin)
routes.get("/pages/sign-up",controller.signup)
routes.post("/insertdata",photos,controller.insertdata)

module.exports = routes