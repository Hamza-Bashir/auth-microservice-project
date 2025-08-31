const joi = require("joi")

const registerSchema = joi.object({
    name:joi.string().required().messages({
        "string.base":"Name must be string",
        "any.required":"Name is required"
    }),
    email:joi.string().email().required().messages({
        "string.base":"Email must be string",
        "string.email":"Email must be valid email",
        "any.required":"Email is required"
    }),
    password:joi.string().required().messages({
        "string.base":"Password must be string",
        "any.required":"Password is required"
    }),
    role:joi.string().valid("user", "admin").messages({
        "string.base":"Role must be string",
        "any.only":"Role must be either 'user' or 'admin'"
    })
})


const loginSchema = joi.object({
    email:joi.string().email().required().messages({
        "string.base":"Email must be string",
        "string.email":"Email must be valid email",
        "any.required":"Email is required"
    }),
    password:joi.string().required().messages({
        "string.base":"Password must be string",
        "any.required":"Password is required"
    })
})

module.exports = {registerSchema, loginSchema}