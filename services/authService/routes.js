const router = require("express").Router()
const {registerUser, loginUser} = require("./service/auth")


router.post("/register-user", registerUser)
router.post("/login-user", loginUser)


module.exports = router