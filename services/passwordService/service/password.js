const bcrypt = require("bcryptjs")
const AppError = require("../../../shared/utilis/AppError")
const response = require("../../../shared/utilis/sendResponse")
const asyncHandler = require("../../../shared/utilis/asyncHandler")
const axios = require("axios")



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


// ------------------ changePassword api --------------------

const changePassword = asyncHandler(async (req,res,next) => {
    const {oldpassword, existingpassword, newpassword, confirmnewpassword} = req.body


    if(oldpassword !== existingpassword){
        return next(new AppError("OLd password cannot matched", 409))
    }

    
    if(newpassword !== confirmnewpassword){
        return next(new AppError("New password cannot matched with confirm password"))
    }

    if(oldpassword === newpassword){
        return next(new AppError("You reset old password, please enter new password", 409))
    }

    

    const hashpass = await axios.post("http://localhost:4002/api/v1/hash-password", {password:newpassword})

    const hashpassword = hashpass.data.data.hashpass

    response(res, 200, true, "change password successfully", {hashpassword, newpassword})

})

module.exports = {hashPassword, comparePassword, changePassword}