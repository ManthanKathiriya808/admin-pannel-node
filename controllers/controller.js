const userTbl = require("../models/userTbl")

const home = (req,res)=>{
    
    res.render("index")
}
const tables = async (req,res)=>{
    
    try {
        
        const user = await userTbl.find()
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


const insertdata = async (req,res)=>{
    
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

    return res.redirect("/pages/tables")



    } catch (error) {
        console.log(error)
        return false
    }

}


module.exports = {home,tables,profile,signin,signup,insertdata}