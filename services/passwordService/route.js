const router = require("express").Router()
const {hashPassword, comparePassword, changePassword} = require("./service/password")


router.post("/hash-password", hashPassword)

router.post("/compare-password", comparePassword)

router.post("/change-password", changePassword)

module.exports = router