
const { registerUser, loginUser, forgetPassword } = require("../controller/auth/authController")
const catchAsync = require("../services/catchAsync")


const router = require("express").Router()

//routes here

router.route("/register")
    .post(catchAsync(registerUser))
router.route("/login")
    .post(catchAsync(loginUser))
router.route("/forgetPassword")
    .post(catchAsync(forgetPassword))



module.exports = router