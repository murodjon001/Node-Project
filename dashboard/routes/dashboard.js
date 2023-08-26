const express = require("express");
const router = express.Router();
const {
  dashboard,
  transaction,
  addWallet,
  addCategory,
  sendUserData
} = require("../controllers/controller");
const { confrimToken } = require("../../middlware/auth");
const {
  transactionValidation,
  walletValidation,
  categoryValidation,
} = require("../validate");

//urls
router.get("/dashboard", confrimToken, dashboard);
router.post(
  "/add/transaction",
  confrimToken,
  transactionValidation,
  transaction
);
router.post("/add/wallet", confrimToken, walletValidation, addWallet);
router.post("/add/category", confrimToken, categoryValidation, addCategory);
router.get("/getUser", confrimToken, sendUserData);

// module export
module.exports = router;
