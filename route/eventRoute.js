
const {createEvent, getAllEvent, deleteEvent } = require("../controller/teacher/teacherController")
const isAuthenticated = require("../middleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()



router.route("/")
    .post(isAuthenticated,catchAsync(createEvent))
    .get(catchAsync(getAllEvent))
router.route("/:id")
    .delete(isAuthenticated,catchAsync(deleteEvent))



module.exports = router