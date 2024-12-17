const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactions.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/transactions', authenticateToken, transactionController.getTransactionById);

module.exports = router;