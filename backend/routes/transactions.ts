const express = require('express');
const router = express.Router();
import {
    getAllTransactions, 
    getSingleTransactionByID, 
    createNewTransaction, 
    updateSingleTransactionByID, 
    deleteSingleTransactionByID
} from '../controllers/transactionController';
import { requireAuth } from "../middleware/requireAuth";


router.use(requireAuth);

router.get('/', getAllTransactions);

router.get('/:id', getSingleTransactionByID);

router.post('/', createNewTransaction);

router.patch('/:id', updateSingleTransactionByID);

router.delete('/:id', deleteSingleTransactionByID);

module.exports = router;