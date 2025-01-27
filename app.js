const express = require('express')
const { connectDatabase } = require('./database/database')
const app = express()
const path = require('path');


require("dotenv").config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase()

const cors = require('cors');
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get("/",(req,res)=>{  
    res.status(200).json({
    message : "I am here"
    })
})
const authRoute = require("./route/authRoute")
const teacherRoute = require("./route/teacherRoute")
const eventRoute = require("./route/eventRoute")
const ticketRoute = require("./route/ticketRoute")
const paymentRoute = require("./route/paymentRoute")



app.use("/api/auth",authRoute)
app.use("/api/user",teacherRoute)
app.use("/api/event",eventRoute)
app.use("/api/ticket",ticketRoute)
app.use("/api/payment",paymentRoute)




const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});