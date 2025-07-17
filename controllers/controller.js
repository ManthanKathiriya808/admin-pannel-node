const userTbl = require("../models/userTbl")
const fs = require("fs")
const nodemailer = require("nodemailer");
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
    console.log("✅ user updated successfully");

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
 


 if(req.user){
        return res.redirect("/dashboard")
    }else{
        return res.render("sign-in")
    }

}


const logout = (req,res)=>{

    req.session.destroy(function(err){
        if(err){
            console.log(err)
            return res.redirect("/dashboard")
        }
        return res.redirect("/")
    })
}

const myinfo = async (req,res)=>{

    const userId = req.session.passport.user;

    try {
        
        const user = await userTbl.findById(userId);

        if(!user){
            console.log("User not found");
            return res.redirect("/");
        }

        res.render("myinfo", {
            user
        });
    } catch (error) {
        console.log(err)
        return false
    }

}
const changepass = async (req,res)=>{

    const userId = req.session.passport.user;

    try {
        
        const user = await userTbl.findById(userId);

        if(!user){
            console.log("User not found");
            return res.redirect("/");
        }

        res.render("changepassword", {
            user
        });
    } catch (error) {
        console.log(err)
        return false
    }
}
const changepassword = async (req,res)=>{

    // const userId = req.session.passport.user;
  

    try {
        
        if(!req.body.oldpass || !req.body.newpass || !req.body.confpass){
            console.log("All fields are required");
            return res.redirect("/pages/changepass");
        }

        if(req.body.oldpass !== req.body.newpass){
            if(req.body.newpass === req.body.confpass){
                const userid = req.session.passport.user
                const user = await userTbl.findByIdAndUpdate(userid,{password : req.body.newpass})
                return res.redirect("/pages/changepass");
            }

        }
        else{
            console.log("both password are same")
            return res.redirect("/pages/changepass");
        }

    } catch (error) {
        console.log(err)
        return false
    }
}



const forgotpass = (req,res)=>{

    try {
        return res.render("forgotpassword")
    } catch (error) {
        console.log(error)
        return res.redirect("/forgotpass")
    }
}

const forgotpassword = async (req,res)=>{

   


    try {

        if(req.body.email){
            
            const user = await userTbl.findOne({email : req.body.email})
            if(user){
                let otp = Math.round(Math.random()*9999)

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "manthankathiriya808@gmail.com",
    pass: "jn7jnAPss4f63QBp6D",
  },
});


  const info = await transporter.sendMail({
    from: '"Admin pannel " <manthankathiriya808@gmail.com>',
    to: req.body.email,
    subject: "Lost Password Otp",
    text: "OTP", 
    html: `your Otp is : <b>${otp}</b>`, 
  });


        if(info){
        console.log("OTP sent successfully");

        req.session.v_otp = {otp,email:req.body.email}
        return res.redirect("/forgotpass")

        }else{
            console.log("OTP not sent cvbcb");
            return res.redirect("/")
        }
            } 
        }else{
        console.log("OTP not sent 34");

            return res.redirect("/")
        }
    } catch (error) {
        console.log("OTP not sent 12");
        console.log(error)
        return res.redirect("/forgotpass")
    }
}


const otp = (req,res)=>{
    try {
        res.render("otp")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {otp,forgotpassword,forgotpass,changepassword,changepass,home,tables,profile,signin,signup,insertData,deleteUser,updateUser,updatedata,signindata,logout,myinfo}

