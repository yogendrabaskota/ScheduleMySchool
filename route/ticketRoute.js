
const { bookTicket, getMyTicket, getAllTicket, generateTicketPDF, verifyTicket } = require("../controller/ticketController")
const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()


router.route("/:id")
    .post(isAuthenticated,catchAsync(bookTicket))
    .get(isAuthenticated,restrictTo('teacher'),catchAsync(getAllTicket))

router.route("/")
    .get(isAuthenticated, catchAsync(getMyTicket))

router.route("/generate/:id")
    .get(catchAsync(generateTicketPDF))


router.route("/verify/:ticketNumber")
    .get(isAuthenticated,catchAsync(verifyTicket))


module.exports = router