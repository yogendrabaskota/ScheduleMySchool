
const { registerUser, loginUser, forgetPassword, verifyotp, resetPassword, approveUser } = require("../controller/auth/authController")
const catchAsync = require("../services/catchAsync")


const router = require("express").Router()

//routes here

router.route("/register")
    .post(catchAsync(registerUser))
router.route("/login")
    .post(catchAsync(loginUser))
router.route("/forgetPassword")
    .post(catchAsync(forgetPassword)) 
router.route("/verifyOtp")
    .post(catchAsync(verifyotp))
router.route("/resetPassword")
    .post(catchAsync(resetPassword))
router.route("/verifyUser/:id")
    .put(catchAsync(approveUser))


module.exports = router