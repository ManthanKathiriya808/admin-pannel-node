const multer = require("multer")

const newPhoto = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb,(null,file.originalname)
    }
})


const photos = multer({storage:newPhoto}).single("photo")

module.exports = photos