
const User = require("../../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//Register user
exports.registerUser = async(req,res)=>{
    const {email,password,phoneNumber,username,role} = req.body
    if(!email || !password || !phoneNumber || !username) {
       return res.status(400).json({
           message : "please provide email,password,phoneNumber,username"
       })
   }
  const userFound = await User.find({email : email})
  if(userFound.length > 0) {
   return res.status(400).json({
       message : "user with that email already exist. please use unique email"
   })
  }

   await User.create({ 
       name : username,
       phoneNumber : phoneNumber,
       email : email,
       password : bcrypt.hashSync(password,8),
       role : role
   })
   res.status(201).json({
       message : "Successfully Registered"
   })
   
}
exports.loginUser = async(req,res)=>{
    const{email, password} = req.body
    if(!email || !password) {
        return res.status(400).json({
            message : "please provide email and password"
        })
    }
    
    const userFound = await User.find({email : email})
    if(userFound.length == 0) {
        return res.status(404).json({
            message : "User with that email is not registered"
        })
    }
    //password check
    const isMatched = bcrypt.compareSync(password,userFound[0].password)
    if(isMatched) {
       
        const token = jwt.sign({id : userFound[0]._id},process.env.SECRET_KEY,{
        expiresIn : '30d'
        })
        res.status(200).json({
            message : " User logged in successfully ",
            data : token
        })
    }else{
        res.status(404).json({
            message : "invalid password"
    
        }) 
    }
}


