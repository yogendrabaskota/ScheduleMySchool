const express = require('express')
const { connectDatabase } = require('./database/database')
const app = express()


require("dotenv").config()
app.use(express.json());

connectDatabase()

app.get("/",(req,res)=>{  
    res.status(200).json({
    message : "I am here"
    })
})
const authRoute = require("./route/authRoute")
const teacherRoute = require("./route/teacherRoute")
const eventRoute = require("./route/eventRoute")
const ticketRoute = require("./route/ticketRoute")


app.use("/api/auth",authRoute)
app.use("/api/user",teacherRoute)
app.use("/api/event",eventRoute)
app.use("/api/ticket",ticketRoute)





const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});