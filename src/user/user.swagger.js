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
 * tags:
 *   name: User
 *   description: The user managing API
 */

/**
 * @swagger
 * /user:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get user data
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User data
 */
