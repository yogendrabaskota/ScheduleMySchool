
const { bookTicket, getMyTicket, getAllTicket } = require("../controller/ticketController")
const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()


router.route("/:id")
    .post(isAuthenticated,catchAsync(bookTicket))
    .get(isAuthenticated,restrictTo('teacher'),catchAsync(getAllTicket))

router.route("/")
    .get(isAuthenticated, catchAsync(getMyTicket))


module.exports = router