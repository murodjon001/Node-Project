const express = require('express');
const router = express.Router();
const { authorization, authentification } = require('../controllers/controller');
const { registrationValidation, loginValidation } = require('../validate')

//urls
router.post('/auth/sing-up', registrationValidation, authorization);
router.post('/auth/login', loginValidation, authentification);

//module export
module.exports = router;
