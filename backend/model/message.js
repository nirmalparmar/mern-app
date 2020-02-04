const mongoose = require('mongoose');
const db = require('./index');

const messageSchema = mongoose.Schema(
    {
        text:{
            type:String,
            required:true,
            maxLength:160
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true
    }
);

messageSchema.pre("remove", async function(next){
    try{
        let user = await db.User.findById(this.user);
        console.log(user);

        user.message.remove(this._id);

        await user.save();

        return next();

    }catch(err){
        return next(err);
    }
})

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;