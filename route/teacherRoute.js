
const { getAllUser, createEvent, deleteUser, getVerifiedUser, deleteUserByTeacher, getSingleUser, sendData } = require("../controller/teacher/teacherController")
const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")
const catchAsync = require("../services/catchAsync")
const router = require("express").Router()


router.route("/")
    .get( isAuthenticated,restrictTo('admin'),catchAsync(getAllUser))

router.route("/verified")
    .get(isAuthenticated,restrictTo('admin'),catchAsync(getVerifiedUser))

router.route("/:id")
    .delete(isAuthenticated,catchAsync(deleteUser))
    .get(isAuthenticated,catchAsync(getSingleUser))


router.route("/delete/:id")
    .delete(isAuthenticated,restrictTo('admin'),catchAsync(deleteUserByTeacher))

router.route("/data")
    .post(catchAsync(sendData))


module.exports = router