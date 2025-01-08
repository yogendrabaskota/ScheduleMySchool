
const {createEvent } = require("../controller/teacher/teacherController")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()

router.route("/")
    .post(catchAsync(createEvent))

module.exports = router