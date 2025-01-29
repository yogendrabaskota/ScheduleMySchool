
const { registerUser, loginUser, forgetPassword, verifyotp, resetPassword, approveUser, rejectUser, deleteAccount, confirmDelete } = require("../controller/auth/authController")
const isAuthenticated = require("../middleware/isAuthenticated")
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
router.route("/rejectUser/:id")
    .put(catchAsync(rejectUser))
router.route("/delete")
    .post(isAuthenticated,catchAsync(deleteAccount))

router.route("/confirmDelete")
    .delete(isAuthenticated,catchAsync(confirmDelete))


module.exports = router