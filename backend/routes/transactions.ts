const express = require('express');
const {
    getAllTransactions,
    getSingleTransactionByID,
    createNewTransaction,
    updateSingleTransactionByID,
    deleteSingleTransactionByID
} = require('../controllers/transactionController');

const router = express.Router();

router.get('/', getAllTransactions);

router.get('/:id', getSingleTransactionByID);

router.post('/', createNewTransaction);

router.patch('/:id', updateSingleTransactionByID);

router.delete('/:id', deleteSingleTransactionByID);

module.exports = router;