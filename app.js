const express = require('express')
const app = express()

app.get("/",(req,res)=>{  
    res.status(200).json({
    message : "I am here"
    })
})
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});