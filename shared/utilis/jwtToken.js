const jwt = require("jsonwebtoken")

const signJwtToken = (payLoad, expiresIn = "1d")=>{
    return jwt.sign(payLoad, process.env.JWT_KEY, {expiresIn})
}


const verifyJwtToken = (token)=>{
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        return {decoded}
    } catch (error) {
        return {error}
    }
}

module.exports = {signJwtToken, verifyJwtToken}