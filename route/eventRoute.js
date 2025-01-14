
const { getSingleEvent } = require("../controller/eventController")
const {createEvent, getAllEvent, cancelEvent, updateEvent } = require("../controller/teacher/teacherController")
const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()




router.route("/:id")
    .delete(isAuthenticated,catchAsync(cancelEvent))
    .patch(isAuthenticated,catchAsync(updateEvent))
    .get(catchAsync(getSingleEvent))

router.route("/")
    .post(isAuthenticated,restrictTo('teacher'),catchAsync(createEvent))
    .get(catchAsync(getAllEvent))


module.exports = router