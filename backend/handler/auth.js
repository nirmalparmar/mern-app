const db = require('../model');
const jwt = require('jsonwebtoken');

exports.signup = async function(req, res, next){
    try{
        console.log(req.body);
        //create user
        let user = await db.User.create(req.body);
        let {id, username, profileUrl, email} = user;
        //generate token
        let token = jwt.sign({
            id,
            username,
            profileUrl,
            email
        }, process.env.SECRET_KEY);
        return res.status(200).json({
            id,
            username,
            email,
            profileUrl,
            token
        })
    }catch(err){
        if(err.code === 11000){
            err.message = "User or email already exists";
        }
        return next({
            status:400,
            message: err.message 
        })
    }
}

exports.signin = async function(req, res, next){
    try{
        console.log("from signin")
        let user =await db.User.findOne({email : req.body.email});
        
        let {id, username, email, profileUrl } = user;
        isMatch = await user.comparePassword(req.body.password);
        
        if(isMatch){
            let token = jwt.sign({
                id,
                username,
                profileUrl,
                email
            }, process.env.SECRET_KEY);
        
            return res.json({
                id,
                username,
                profileUrl,
                email,
                token
            })
        }else{
            return next({
                status:400,
                message: "Incorrect email or Password"
            })
        }
        console.log(profileUrl);
    }catch(err){
        return next(err);
    }
}

