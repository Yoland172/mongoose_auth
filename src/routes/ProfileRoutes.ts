import express, { Application } from 'express';
import { protect } from '../middleware/authMiddleware';
import { getUserProfile, updateUserProfile } from '../controllers/ProfileController';
import { updateUserValidation } from '../controllers/ProfileValidator';
import { handleValidationResult } from '../middleware/validateRequestMiddleware';

const router = express.Router();

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get the logged-in user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user's profile
 *       401:
 *         description: Not authorized
 *       404:
 *         description: User not found
 */
router.route('/').get(protect, getUserProfile);


/**
 * @swagger
 * /profile:
 *   patch:
 *     summary: Update user profile fields
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name (optional, must be at least 3 characters if provided)
 *               desiredJobTitle:
 *                 type: string
 *                 description: The user's desired job title (optional, must be at least 3 characters if provided)
 *               aboutMe:
 *                 type: string
 *                 description: A brief description about the user (optional, must be at least 10 characters if provided)
 *           example:
 *             name: Jane Doe
 *             desiredJobTitle: Senior Developer
 *             aboutMe: Experienced in web development and passionate about technology.
 *     responses:
 *       200:
 *         description: The user's profile was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User profile updated successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.route('/').patch(protect, updateUserValidation, handleValidationResult, updateUserProfile);

export const setupProfileRoutes = (app: Application) => {
    app.use('/profile', router);
};