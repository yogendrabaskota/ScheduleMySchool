
const { getSingleEvent, getEventReport } = require("../controller/eventController")
const {createEvent, getAllEvent, cancelEvent, updateEvent, getMyEvent } = require("../controller/teacher/teacherController")
const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()


router.route("/")
    .post(isAuthenticated,restrictTo('teacher'),catchAsync(createEvent))
    .get(catchAsync(getAllEvent))
router.route("/report/:id")
    .get(catchAsync(getEventReport))

    
router.route("/my")
    .get(isAuthenticated,restrictTo('teacher'),catchAsync(getMyEvent))


router.route("/:id")
    .delete(isAuthenticated,catchAsync(cancelEvent))
    .patch(isAuthenticated,catchAsync(updateEvent))
    .get(catchAsync(getSingleEvent))





module.exports = router