const bcrypt = require("bcryptjs")
const AppError = require("../../../shared/utilis/AppError")
const response = require("../../../shared/utilis/sendResponse")
const asyncHandler = require("../../../shared/utilis/asyncHandler")



// ------------------ hashPassword api --------------------

const hashPassword = asyncHandler(async (req,resp,next) => {

   
    const {password} = req.body

    const hashpass = await bcrypt.hash(password, 10)

    response(resp, 200, true, "hash password generate successfully", {hashpass})
})

module.exports = {hashPassword}