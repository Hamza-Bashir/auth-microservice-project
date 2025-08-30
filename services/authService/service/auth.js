const User = require("../model/user.model")
const code = require("../constants/httpStatus")
const message = require("../constants/messages")
const asyncHandler = require("../utilis/asyncHandler")
const bcrypt = require("bcryptjs")
const response = require("../utilis/sendResponse")
const AppError = require("../utilis/AppError")
const {signJwtToken} = require("../utilis/jwtToken")


// -------------- register user ----------------

const registerUser = asyncHandler(async (req,res, next) => {
    const {name, email, password, role} = req.body

    const existingUser = await User.findOne({email:email})

    if(existingUser){
        return next(new AppError(message.AUTH.ALREADY_REGISTER, code.CONFLICT))
    }

    const hashPassword = await bcrypt.hash(password, 10)


    await User.create({
        name,
        email,
        plainPassword:password,
        hashPassword:hashPassword,
        role
    })

    response(res, 200, true, message.AUTH.REGISTER_SUCCESS)
})


module.exports = {registerUser}

