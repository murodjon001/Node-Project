const { body } = require("express-validator");

exports.transactionValidation = [
  body("amount")
    .notEmpty()
    .isNumeric()
    .withMessage("let the value be a number"),
  body("createdAt")
    .isISO8601()
    .withMessage(
      "Invalid date format. Please use ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)."
    ),
  body("description")
    .isAlpha()
    .isLength({ min: 2, max: 255 })
    .withMessage("Description must be between 2 and 100 characters"),
  body("categoryId")
    .notEmpty()
    .isNumeric()
    .withMessage("field cannot be empty."),
  body("walletId").notEmpty().isNumeric().withMessage("field cannot be empty."),
];

exports.walletValidation = [
  body("name")
    .notEmpty()
    .isAlpha()
    .isLength({ min: 2 })
    .withMessage("wallet name can't be less than 2 characters?"),
  body("colors").notEmpty().withMessage("choise a color and enter"),
  body("description")
    .isAlpha()
    .isLength({ min: 2, max: 255 })
    .withMessage("Description must be between 2 and 100 characters"),
  body("currency").notEmpty().withMessage("choise and enter the currency"),
];

exports.categoryValidation = [
  body("name")
    .notEmpty()
    .isAlpha()
    .isLength({ min: 2 })
    .withMessage("category name can't be less than 2 characters?"),
  body("colors").notEmpty().withMessage("choise a color and enter"),
  body("description")
    .isAlpha()
    .isLength({ min: 2, max: 255 })
    .withMessage("Description must be between 2 and 100 characters"),
  body("operation").notEmpty().withMessage("choise and enter the operation"),
];
