
const {createEvent } = require("../controller/teacher/teacherController")
const isAuthenticated = require("../middleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()

router.route("/")
    .post(isAuthenticated,catchAsync(createEvent))

module.exports = router