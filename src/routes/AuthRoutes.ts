import express, { Application } from 'express';
import { authUser, registerUser } from '../controllers/AuthController';
import { protect } from '../middleware/authMiddleware';
import { loginValidation, registerValidation } from '../controllers/AuthValidator';
import { handleValidationResult } from '../middleware/validateRequestMiddleware';
import { getUserProfile, updateUserProfile } from '../controllers/ProfileController';
import { updateUserValidation } from '../controllers/ProfileValidator';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user's name
 *         desiredJobTitle:
 *           type: string
 *           description: The user's desired job title (optional, must be at least 3 characters if provided)
 *         aboutMe:
 *           type: string
 *           description: A brief description about the user
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         name: John Doe
 *         desiredJobTitle: Software Engineer
 *         aboutMe: A passionate developer with experience in full-stack development.
 *         email: john@example.com
 *         password: password123
 */

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *       400:
 *         description: The user already exists / Invalid user data
 */
router.route('/').post(registerValidation, handleValidationResult, registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
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
 *               password:
 *                 type: string
 *             example:
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', loginValidation, handleValidationResult, authUser);

export const setupAuthRoutes = (app: Application) => {
    app.use('/auth', router);
  };
