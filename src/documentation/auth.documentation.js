/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - _id
 *         - role
 *         - email
 *         - balance
 *         - firstName
 *         - lastName
 *         - sex
 *         - password
 *       properties:
 *         _id:
 *           type: integer
 *         role: 
 *           type: string
 *           enum: [user, admin]
 *         email:
 *           type: string
 *         balance:
 *           type: integer
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         sex:
 *           type: string
 *           enum: [male, female]
 *         password:
 *           type: string
 *       example:
 *         _id: 100
 *         role: user
 *         firstName: Johny
 *         lastName: Doe
 *         email: johnydoe@yandex.ru
 *         balance: 2500
 *         sex: male
 *         password: jsd2j3o99skjrj3i4k2o3o2kaslsdl23
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
 *     summary: Login to the site
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *              email: johnydoe@gmail.com
 *              password: Superman123
 *     responses:
 *       '200':
 *         description: Ok!
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             firstName: Johny
 *             lastName: Doe
 *             email: johnydoe@yandex.ru
 *             password: Superman123
 *             confirmPassword: Superman123
 *     responses:
 *       '200':
 *         description: Ok!
 */

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       '200':
 *         description: Ok!
 */

/**
 * @swagger
 * /auth/state:
 *   get:
 *     summary: Get logined user data
 *     tags: [Auth]
 *     responses:
 *       '200':
 *         description: Ok!
 */
