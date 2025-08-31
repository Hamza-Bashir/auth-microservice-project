const router = require("express").Router()
const {registerUser, loginUser, refreshToken} = require("./service/auth")
const validate = require("../../shared/middlewares/validate")
const {registerSchema, loginSchema} = require("./validation/auth.validate")

/**
 * @swagger
 * /api/v1/register-user:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Hamza
 *               email:
 *                 type: string
 *                 example: hamza@gmail.com
 *               password:
 *                 type: string
 *                 example: hamza123
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: user
 *     responses:
 *       200:
 *         description: Registration successful
 *         
 *       400:
 *         description: Validation error or bad request
 * 
 * 
 *       500:
 *          description: Internal Server error  
 */

router.post("/register-user", validate(registerSchema), registerUser)


/**
 * @swagger
 * /api/v1/login-user:
 *   post:
 *     summary: Login a user
 *     description: Login a existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: hamza@gmail.com
 *               password:
 *                 type: string
 *                 example: hamza123
 *     responses:
 *       200:
 *         description: Login Successfully
 *         
 *       400:
 *         description: Validation error or bad request
 * 
 * 
 *       500:
 *          description: Internal Server error  
 */

router.post("/login-user", validate(loginSchema), loginUser)


/**
 * @swagger
 * /api/v1/refresh-token:
 *   patch:
 *     summary: Refresh token
 *     description: Use a refresh token sent in Authorization header to get a new access token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refresh successfully
 *       401:
 *         description: No token provided
 *       403:
 *         description: Token is not valid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */




router.patch("/refresh-token", refreshToken)


module.exports = router