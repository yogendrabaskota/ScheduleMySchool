
const {createEvent, getAllEvent, cancelEvent, updateEvent } = require("../controller/teacher/teacherController")
const isAuthenticated = require("../middleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()



router.route("/")
    .post(isAuthenticated,catchAsync(createEvent))
    .get(catchAsync(getAllEvent))
router.route("/:id")
    .delete(isAuthenticated,catchAsync(cancelEvent))
    .patch(isAuthenticated,catchAsync(updateEvent))



module.exports = router