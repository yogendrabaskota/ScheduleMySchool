
const { getAllUser, createEvent, deleteUser, getVerifiedUser } = require("../controller/teacher/teacherController")
const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")
const catchAsync = require("../services/catchAsync")
const router = require("express").Router()


router.route("/")
    .get( isAuthenticated,restrictTo('teacher'),catchAsync(getAllUser))

router.route("/verified")
    .get(isAuthenticated,restrictTo("teacher"),catchAsync(getVerifiedUser))

router.route("/:id")
    .delete(isAuthenticated,catchAsync(deleteUser))


module.exports = router