const express = require("express")
const controller = require("../controller/user_controller")

const router = express.Router()

router.route("/")
    .get(controller.getUser)
    .post(controller.createUser)
    
router.route("/:name")
    .get(controller.findUserById)
    .patch(controller.updateUser)
    .delete(controller.deleteUser)

router.route("/delete")
    .delete(controller.deleteUser)

module.exports = router;