const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController')

router.post('/', loanController.submitApplication)
router.get('/', loanController.getApplication);

module.exports = router;