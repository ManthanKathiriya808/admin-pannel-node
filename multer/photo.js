const multer = require("multer")

const newImage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/")
    },
  filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})


const photos =  multer({storage:newImage}).single("photo")


module.exports = photos
