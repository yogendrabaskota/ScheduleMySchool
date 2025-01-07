
const { getAllUser } = require("../controller/teacher/teacherController")
const router = require("express").Router()


router.route("/").get(getAllUser)



module.exports = router