const router = require("express").Router()
const {hashPassword} = require("./service/password")


router.post("/hash-password", hashPassword)

module.exports = router