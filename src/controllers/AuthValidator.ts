import { body } from "express-validator";

export const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("desiredJobTitle")
    .optional()
    .isLength({ min: 3 })
    .withMessage(
      "Desired Job Title must be at least 3 characters long if provided"
    ),
  body("aboutMe")
    .optional()
    .isLength({ min: 3 })
    .withMessage(
      "Desired Job Title must be at least 3 characters long if provided"
    ),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").notEmpty().withMessage("Password is required"),
];
