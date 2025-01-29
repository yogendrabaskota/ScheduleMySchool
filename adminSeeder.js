const User = require("./model/userModel")
const bcrypt = require("bcryptjs")


const adminSeeder =async ()=> {


    // admin seeding

//check whether the admin exists or not 
const isAdminExists = await User.findOne({email : "admin@gmail.com"})
if(!isAdminExists){
    await User.create({
        email : "admin@gmail.com",
        name : "admin",
        password : bcrypt.hashSync("admin",10),
        phoneNumber : "9090",
        role : "admin",
        isUserVerified : true
    })
    console.log("Admin seeded successfully")

}else{
    console.log("Admin already seeded")
}


}

module.exports = adminSeeder