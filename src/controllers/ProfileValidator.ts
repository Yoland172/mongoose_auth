import { body } from 'express-validator';

export const updateUserValidation = [
  body('name')
    .optional()
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  
  body('desiredJobTitle')
    .optional()
    .isLength({ min: 3 }).withMessage('Desired Job Title must be at least 3 characters long if provided'),
  
  body('aboutMe')
    .optional()
    .isLength({ min: 10 }).withMessage('About Me must be at least 10 characters long')
];
