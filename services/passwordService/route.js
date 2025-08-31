const router = require("express").Router()
const {hashPassword, comparePassword} = require("./service/password")


router.post("/hash-password", hashPassword)

router.post("/compare-password", comparePassword)

module.exports = router