const passport = require("passport")

const localStrategy  = require("passport-local")
const userTbl = require("../models/userTbl")


passport.use(new localStrategy(
    {usernameField:"email"},
    async function(email, password, done){
        let curRec = await userTbl.findOne({email:email})


        if(!curRec){
            return done(null,false)
        }

        if(curRec.password !== password){
            return done(null,false)
        }

        return done(null,curRec)
    }

))


passport.serializeUser(function(user,done){
    if(!user){
        return done(null,false)
    }
    return done(null,user.id)
})


passport.deserializeUser(async function(id,done){
    let curRec = await userTbl.findById(id)
    if(!curRec){
        return done(null,false)
    }

    return done(null,curRec)
})

passport.isAuth = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    else{
        return res.redirect('/signindata')
    }
}

passport.userAuth = (req,res,next)=>{
    res.locals.admin = req.user
    next()
}


module.exports = passport