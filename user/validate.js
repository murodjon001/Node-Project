const { body } = require("express-validator");

exports.registrationValidation = [
    body("firstName")
      .isAlpha()
      .isLength({ min: 2 })
      .withMessage("First name must be lengh 2 characters"),
    body("lastName")
      .isAlpha()
      .isLength({ min: 2 })
      .withMessage("Last name must be lengh 2 characters"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ];

exports.loginValidation = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters long"),
];