const User = require("../model/user.model")
const code = require("../../../shared/constants/httpStatus")
const message = require("../../../shared/constants/messages")
const asyncHandler = require("../../../shared/utilis/asyncHandler")
const bcrypt = require("bcryptjs")
const response = require("../../../shared/utilis/sendResponse")
const AppError = require("../../../shared/utilis/AppError")
const {signJwtToken} = require("../../../shared/utilis/jwtToken")



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


// -------------- login user ----------------

const loginUser = asyncHandler(async (req,res,next) => {
    const {email, password} = req.body

    const existingUser = await User.findOne({email:email})

    if(!existingUser){
        return next(new AppError(message.AUTH.NOT_FOUND, code.NOT_FOUND))
    }

    const isMatch = await bcrypt.compare(password, existingUser.hashPassword)
    

    if(!isMatch){
        return next(new AppError("Password cannot match", 401))
    }

    const token = signJwtToken({id:existingUser._id, name:existingUser.name, role:existingUser.role})

    


    existingUser.token = token
    await existingUser.save()

    response(res, 200, true, "Login Successfully", {token:token, name:existingUser.name, email:existingUser.email, role:existingUser.role})
})


// -------------- refresh token ----------------

const refreshToken = asyncHandler(async (req,res,next) => {
    const {id} = req.user

    const existingUser = await User.findOne({_id:id})

    const token = signJwtToken({id:existingUser._id, name:existingUser.name, email:existingUser._email})

    existingUser.token = token

    await existingUser.save()

    response(res, 200, true, "Token refresh successfully", {newToken:token})
})


// -------------- logout ----------------

const logout = asyncHandler(async (req,res,next) => {
    
    const {id} = req.user

    const existingUser = await User.findOne({_id:id})

    existingUser.token = null

    await existingUser.save()

    response(res, 200, true, "Logout successfully")
})


// -------------- profile ----------------

const profile = asyncHandler(async (req,res,next) => {
    
    const {id} = req.user

    const existingUser = await User.findOne({_id:id}).select("name email role isVerified hashPassword")

    response(res, 200, true, "Profile fetched successfully", {existingUser})

})


module.exports = {registerUser, loginUser, refreshToken, logout, profile}

