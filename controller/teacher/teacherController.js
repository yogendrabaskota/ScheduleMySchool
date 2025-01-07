const User = require("../../model/userModel")


exports.getAllUser = async(req,res)=>{
    const userFound = await User.find()
    if(userFound.length < 0) {
     res.status(400).json({
         message : "No user found"
     })
    }else{
      res.status(200).json({
          message : "User fetched succesfully",
          data : userFound
      })
    }
     
  }
