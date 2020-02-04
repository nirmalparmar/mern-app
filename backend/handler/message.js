const db = require('../model');

exports.createMessage = async function (req, res, next){
    try{
        let foundUser = await db.User.findById(req.params.id);
        if(foundUser){
            let message = await db.Message.create({
                    text:req.body.text,
                    user:req.params.id
                });
            
            foundUser.message.push(message.id);
            await foundUser.save();
            let foundMessage = await db.Message.findById(message.id).populate('user',{
                username:true,
                profileUrl:true
            });
            return res.json(foundMessage); 
        }else{
            return next({status:400,message: 'User not found'})
        }
        
    }catch(err){
        return next(err);
    }
    
}
exports.getMessage = async function (req, res, next){
    try{
        let message = await db.Message.findById(req.params.message_id).populate('user',{
            username:true,
            profileUrl:true
        });
        return res.json(message);
    }catch(err){
        return next(err);
    }
    
}

exports.getMessagesofUser = async function (req, res, next){
    try{
        let messages = await db.Message.find({user:req.params.id});
        return res.json(messages)
    }catch(err){
        return next(err);
    }
}

exports.getAllMessage = async function (req, res, next){
    try{
        let messages = await db.Message.find().populate("user",{
            username:true,
            profileUrl:true
        })
        return res.json(messages);
    }catch(err){
        return next(err);
    }
}
exports.deleteMessage = async function (req, res, next){
    try{
        let foundMessage = await db.Message.findById(req.params.message_id);
        foundMessage.remove();
        return res.json(foundMessage);
    }catch(err){
        return next(err);
    }
    

}



