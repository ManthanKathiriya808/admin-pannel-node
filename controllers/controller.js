const userTbl = require("../models/userTbl")
const fs = require("fs")
const home = (req,res)=>{
    
    res.render("index")
}
const tables = async (req,res)=>{
    
    try {
        
        const user = await userTbl.find({})
      return  res.render("tables",{
            user
        })

    } catch (error) {
     console.log(error)   
    }
}
const profile = (req,res)=>{
    
    res.render("profile")
}
const signin = (req,res)=>{
    
    res.render("sign-in")
}
const signup = (req,res)=>{
    
    res.render("sign-up")
}
const deleteUser = async (req,res)=>{
    
   const id = req.params.id

   try {

    const deleteuser = await userTbl.findByIdAndDelete(id)

    return res.redirect("/pages/tables")

   } catch (error) {
    console.log(error)
    return false
   }

}

const updateUser = async (req,res)=>{
    
   const id = req.query.id

   try {
    const user = await userTbl.findById(id)

    if(!user){
        return res.redirect("/pages/tables")
    }

    res.render("updateprofile",{
        user
    })

   } catch (error) {
    console.log(error)
    return false
   }

}
const updatedata = async (req,res)=>{
    
 const {id,username,email,password,age,address,city,country,pincode,aboutme} = req.body
    
 try {
    
    const user = await userTbl.findById(id)
    if(!user){
        return res.redirect("/pages/tables")
    }

    const updateUser = {
        username,
        email,
        password,
        age,
        address,
        city,
        country,
        pincode,
        aboutme,
       
    }

    if(req.file){
        if(user.photo && fs.existsSync(user.photo)){
            fs.unlinkSync(user.photo)
        }

        updateUser.photo = req.file.path
    }

    await userTbl.findByIdAndUpdate(id,updateUser)
    console.log("✅ Movie updated successfully");

        res.redirect("/pages/tables");



 } catch (error) {
    console.log(error)
    return false
 }


}


const insertData = async (req,res)=>{
    
    const {username,email,password,age,address,city,country,pincode,aboutme} = req.body
    let photo = req.file.path
    try {
        
    const user = await userTbl.create({
        username,
        email,
        password,
        age,
        address,
        city,
        country,
        pincode,
        aboutme,
        photo
    })
 
    console.log(" data added successfully")

     res.redirect("/pages/tables")



    } catch (error) {
        console.log(error)
        return false
    }

}

const signindata = (req,res)=>{
    console.log(req.body)
}


module.exports = {home,tables,profile,signin,signup,insertData,deleteUser,updateUser,updatedata,signindata}

// comment added