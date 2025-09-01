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


// ------------------ comparePassword api --------------------

const comparePassword = asyncHandler(async (req,res,next) => {
    const {plainPassword, hashPassword} = req.body

    if(!plainPassword || !hashPassword){
        return next(new AppError("Password does not match", 409))
    }


    const isMatch = await bcrypt.compare(plainPassword, hashPassword)

    

    response(res, 200, true, "Password matched successfully", {isMatch})

})

module.exports = {hashPassword, comparePassword}