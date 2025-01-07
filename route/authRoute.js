
const { registerUser } = require("../controller/auth/authController")


const router = require("express").Router()

//routes here

router.route("/register").post(registerUser)



module.exports = router