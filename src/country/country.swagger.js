/**
 * @swagger
 * tags:
 *   name: Country
 *   description: The countries managing API
 */

/**
 * @swagger
 * /country:
 *   get:
 *     summary: Get list of all countries
 *     tags: [Country]
 *     responses:
 *       200:
 *         description: The list of the countries
 *         contents:
 *           application/json:
 *           schema:
 *             type: array
 */