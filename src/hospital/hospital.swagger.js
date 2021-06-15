/**
 * @swagger
 * tags:
 *   name: Hospital
 *   description: The hospitals managing API
 */

/**
 * @swagger
 * /hospital:
 *   get:
 *     summary: Get list of all hospitals
 *     tags: [Hospital]
 *     parameters:
 *       - name: type
 *         in: query
 *         type: string
 *         description: Hospitals type
 *       - name: country
 *         in: query
 *         type: string
 *         description: Hospitals country
 *       - name: department
 *         in: query
 *         type: string
 *         description: Hospitals department
 *     responses:
 *       200:
 *         description: The list of the hospitals
 *         contents:
 *           application/json:
 *           schema:
 *             type: array
 */

/**
 * @swagger
 * /hospital/{url}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get hospital by url
 *     tags: [Hospital]
 *     parameters:
 *       - name: url
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: Hospital url
 *     responses:
 *       200:
 *         description: The hospital data
 *         contents:
 *           application/json:
 *           schema:
 *             type: array
 *       404:
 *         description: Hospital with that url was not found
 */