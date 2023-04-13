const express = require('express');
const {
    getAllTransactions,
    getSingleTransactionByID,
    createNewTransaction,
    updateSingleTransactionByID,
    deleteSingleTransactionByID
} = require('../controllers/transactionController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', getAllTransactions);

router.get('/:id', getSingleTransactionByID);

router.post('/', createNewTransaction);

router.patch('/:id', updateSingleTransactionByID);

router.delete('/:id', deleteSingleTransactionByID);

module.exports = router;