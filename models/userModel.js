const mongoose=require('mongoose')
 const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the user name"]
    },
    email:{
        type:String,
        required:[true,"Please the email address"],
        unique:[true,"Email already registered"]
    },
    password:{
        type:String,
        required:[true,"Please teh user password"],
    }
 },{
    timestamps:true,
 })

 module.exports=mongoose.model("Users",userSchema);