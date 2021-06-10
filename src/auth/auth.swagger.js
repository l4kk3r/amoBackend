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
 * components:
 *   schemas:
 *     Request_Auth_Register:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         name:
 *           type: string
 *           description: User name
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *         confirmPassword:
 *           type: string
 *           description: Password confirmation
 *       example:
 *         name: John
 *         email: johndoe@yandex.ru
 *         password: JohnPassword123
 *         confirmPassword: JohnPassword123
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

/**
 * @swagger
 * /auth/register:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Register user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request_Auth_Register'
 *     responses:
 *       200:
 *         description: Data for logging into site
 */
