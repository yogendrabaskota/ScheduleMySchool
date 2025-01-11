const { initiateKhaltiPayment, verifyPidx } = require("../controller/payment/paymentController")
const isAuthenticated = require("../middleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")


const router = require("express").Router()

router.route("/")
    .post(isAuthenticated,catchAsync(initiateKhaltiPayment))
router.route("/success")
    .get(catchAsync(verifyPidx))

module.exports = router