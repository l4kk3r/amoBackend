const express = require('express')
const router = express.Router()

const authServices = require('./auth.services')
const userMiddlewares = require('@src/user/user.middlewares')

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - bearerAuth: []   
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Request_Auth_Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *       example:
 *         email: johndoe@yandex.ru
 *         password: JohnPassword123
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication managing API
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Login to site
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request_Auth_Login'
 *     responses:
 *       200:
 *         description: Data for logging into site
 */

router.post('/register', userMiddlewares.register, authServices.register)
router.post('/login', userMiddlewares.login, authServices.login)


module.exports = router
