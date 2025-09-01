const User = require("../model/user.model")
const code = require("../../../shared/constants/httpStatus")
const message = require("../../../shared/constants/messages")
const asyncHandler = require("../../../shared/utilis/asyncHandler")
const bcrypt = require("bcryptjs")
const response = require("../../../shared/utilis/sendResponse")
const AppError = require("../../../shared/utilis/AppError")
const {signJwtToken} = require("../../../shared/utilis/jwtToken")
const axios = require("axios")



// -------------- register user ----------------

const registerUser = asyncHandler(async (req,res, next) => {
    const {name, email, password, role} = req.body

    const existingUser = await User.findOne({email:email})

    if(existingUser){
        return next(new AppError(message.AUTH.ALREADY_REGISTER, code.CONFLICT))
    }
    
    const hashpass = await axios.post("http://localhost:4002/api/v1/hash-password", {password})
    

    const hashPassword = hashpass.data.data.hashpass


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

    const isMatched = await axios.post("http://localhost:4002/api/v1/compare-password", {plainPassword:password, hashPassword:existingUser.hashPassword})

    const isMatch = isMatched.data.data.isMatch
    

    if(!isMatch){
        return next(new AppError("Password cannot matched", 409))
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


// -------------- change password ----------------

const changePassword = asyncHandler(async (req,res,next) => {
    
    const {id} = req.user
    const {oldPassword, newPassword, confirmNewPassword} = req.body

    const existingUser = await User.findOne({_id:id})

    if(oldPassword !== existingUser.plainPassword){
        return next(new AppError("Old password cannot exist", 409))
    }

    if(newPassword !== confirmNewPassword){
        return next(new AppError("New password cannot matched with confirm password"))
    }

    const newHashPassword = await axios.post("http://localhost:4002/api/v1/hash-password", {password:newPassword})

    
    

    const newHassPass = newHashPassword.data.data.hashpass

    

    existingUser.plainPassword = newPassword
    existingUser.hashPassword = newHassPass

    await existingUser.save()

    response(res, 200, true, "Password reset successfully")


})

// -------------- forget password ----------------




// -------------- verified user ----------------


module.exports = {registerUser, loginUser, refreshToken, logout, profile, changePassword}

