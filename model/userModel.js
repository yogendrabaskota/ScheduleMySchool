const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email : {
        type : String,
        required : [true, 'userEmail must be provided'],
        unique : true,
        lowercase : true
    },
    name : {
        type : String,
        required : [true,"userName must be provided"]
    },
    phoneNumber : {
        type : String,
        required : [true, 'userPhoneNumber must be provided']
   
    },

    password : {
        type : String,
        required : [true,'userPasssword must be provided'],
       // select : false,
        minlength : 8
    },

    role : {
        type : String,
        enum : ["teacher","student","guest"],
        default : "student"
    },
    otp : {
        type : String
    },
    isOtpVerified : {
        type : Boolean,
        default : false,
        //select : false 
    },
    
},{
    timestamps : true
}
)

const User = mongoose.model("User", userSchema)
module.exports = User