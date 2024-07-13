const express = require("express");
const { registerUsers, loginUsers, userStatus, logoutUsers } = require("../controller/user-controller");
const tokenHandler = require("../middleware/tokenHandler");

const router = express.Router();


// Registration route
router.route("/Register").post(registerUsers);


router.route("/Login").post(loginUsers);


router.route("/Status/Status").get(tokenHandler,userStatus);

router.route("/logout").post(logoutUsers);

module.exports = router;