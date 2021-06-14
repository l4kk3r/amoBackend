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
 *     summary: Get list of all questions
 *     tags: [Hospital]
 *     responses:
 *       200:
 *         description: The list of the questions
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