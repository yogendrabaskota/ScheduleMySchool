
const User = require("../../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
//const sendEmail = require("../../services/sendEmail")
const sendEmail = require("../../services/sendEmail")


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
  const isUserVerified = role === "guest"; // Only 'guest' role is automatically verified


   await User.create({ 
       name : username,
       phoneNumber : phoneNumber,
       email : email,
       password : bcrypt.hashSync(password,8),
       role : role,
       isUserVerified: isUserVerified,
   })
   res.status(201).json({
    message: isUserVerified
      ? "Successfully Registered"
      : "Registration successful. Waiting for admin approval.",
  });
   
}

exports.loginUser = async(req,res)=>{
    const{email, password} = req.body
    if(!email || !password) {
        return res.status(400).json({
            message : "please provide email and password"
        })
    }
    
    const userFound = await User.find({email : email})
    //console.log("from",userFound[0].role)
    if(userFound.length == 0) {
        return res.status(404).json({
            message : "User with that email is not registered"
        })
    }

  // console.log(userFound[0].isUserVerified)
   //console.log(!userFound.isUserVerified)
   //console.log(userFound[0].isUserVerified == false)

//    if(!userFound.isUserVerified){
//     return res.status(403).json({
//         message: "User is not verified yet"
//         });
//     }
    if(userFound[0].isUserVerified == false){
        return res.status(403).json({
         message: "User is not verified yet"
            });
    }
    
    //password check
    const isMatched = bcrypt.compareSync(password,userFound[0].password)
  //  if (!userFound.isUserVerified) return res.status(403).json({ error: 'User not verified.' });

    


    if(isMatched) {
       
        const token = jwt.sign({id : userFound[0]._id},process.env.SECRET_KEY,{
        expiresIn : '30d'
        })
        res.status(200).json({
            message : " User logged in successfully ",
            data : token,
            role : userFound[0].role
        })
    }else{
        res.status(404).json({
            message : "invalid password"
    
        }) 
    }
}

exports.forgetPassword =async(req,res)=>{
    const { email } =req.body
    if(!email){
        return res.status(400).json({
            message : "Please provide email"
        })
    }
    const userFound = await User.find({email})
    //console.log(userFound)
    if(userFound.length == 0){
        return res.status(404).json({
            message : "Email is not registered"
        })
    }
    const otp = Math.floor(Math.random() *10000)
    userFound[0].otp = otp
    await userFound[0].save()
    //console.log("This is otp",otp)

    await sendEmail({
        email : email, //to this email
        subject : "OTP for your School account",
        message : `This is your otp.\n ${otp} \nDon't share it with anyone`
     }) 
     res.status(200).json({
        message : "OTP sent successfully"
     })

}

exports.verifyotp = async(req,res) => {
    const {email,otp} = req.body
    if(!email || !otp) {
        return res.status(400).json({
            message : "Please provide otp"
        })
    }
    const userExists = await User.find({email})
    if(userExists.length == 0) {
        return res.status(404).json({
            message : "Email is not registered"
        })
    }
    //console.log("userexxist",userExists[0])
    //console.log("otp",userExists[0].otp)
    //console.log("input",otp)
    //console.log(userExists[0].otp !== otp)
    
    if(userExists[0].otp != otp){
        res.status(400).json({
            message : "Invalid otp"
        })
    }else{
        // delete after used
        userExists[0].otp = undefined
        userExists[0].isOtpVerified = true
        await userExists[0].save()
        res.status(200).json({
            message : "Otp is correct"
        })
    }
}

exports.resetPassword = async(req,res) => {
    const{email,newPassword,confirmPassword} = req.body
    if(!email || !newPassword || !confirmPassword){
        return res.status(400).json({
            message : "Please provide email, newpassword and confirmpassword"
        })
    }

    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message : "NewPassword and confirmPassword doesn't match"
        })
    }

    const userFound = await User.find({email})
    if(userFound.length == 0){
        return res.status(404).json({
            message : "User email not registered"
        })

    }
    //console.log(userFound[0])
    //console.log(userExist[0].isOtpVerified)

    if(userFound[0].isOtpVerified !== true){
        return res.status(403).json({
            message : "You cannot perform this action"
        })
    }


    userFound[0].password = bcrypt.hashSync(newPassword,8)
    userFound[0].isOtpVerified = false
    await userFound[0].save()

    res.status(200).json({
        message : "password changed successfully"
    })

}

// exports.approveUser = async (req, res) => {
//     const { userId } = req.params;
  
//     try {
//       const user = await User.findById(userId);
  
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       if (user.role === "guest") {
//         return res.status(400).json({ message: "Guest users do not require approval" });
//       }
  
//       if (user.isUserVerified) {
//         return res.status(400).json({ message: "User is already verified" });
//       }
  
//       user.isUserVerified = true;
//       await user.save();
  
//       res.status(200).json({ message: `${user.role} verified successfully` });
//     } catch (error) {
//       res.status(500).json({ message: "Error approving user", error: error.message });
//     }
//   };


  exports.approveUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    if (user.isUserVerified) {
        const error = new Error("User is already verified");
        error.statusCode = 400;
        throw error;
    }
    if (user.role === "guest") {
        return res.status(400).json({ message: "Guest users do not require approval" });
      }

    user.isUserVerified = true;
    await user.save();

    res.status(200).json({ message: "User verified successfully" });
};
