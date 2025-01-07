const mongoose = require("mongoose")

exports.connectDatabase = async()=>{
    
// connecting to DB
await mongoose.connect(process.env.MONGOOSE)

// await =  wait till connected to databases
console.log("database connected successfully")

}