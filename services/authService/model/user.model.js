const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    plainPassword:{
        type:String,
        required:true
    },
    hashPassword:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user", "admin"],
        default:"user"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    token:{
        type:String
    },
    resetPasswordToken:{
        type:String,
        default:null
    },
    resetPasswordExpires:{
        type:Date,
        default:null
    }
}, {
    timestamps:true
})


module.exports = mongoose.model("user", userSchema)