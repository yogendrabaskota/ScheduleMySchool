
const { bookTicket, getMyTicket, getAllTicket, generateTicketPDF } = require("../controller/ticketController")
const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()


router.route("/:id")
    .post(isAuthenticated,catchAsync(bookTicket))
    .get(isAuthenticated,restrictTo('teacher'),catchAsync(getAllTicket))

router.route("/")
    .get(isAuthenticated, catchAsync(getMyTicket))

router.route("/generate/:ticketId")
    .get(catchAsync(generateTicketPDF))

module.exports = router