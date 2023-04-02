import { Request, Response } from 'express';

const express = require('express');
const Transaction = require('../models/transactionModel');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    return res.json({msg: 'GET ALL'});
})

router.get('/:id', (req: Request, res: Response) => {
    return res.json({msg: 'GET ID'});
})

router.post('/', async (req: Request, res : Response) => {
    const { value, date, transactionType, description } = req.body;

    try {
        const transaction = await Transaction.create({ value, date, transactionType, description });
        res.status(200).json(transaction);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
})

router.patch('/:id', (req: Request, res: Response) => {
    return res.json({msg: 'PATCH'});
})

router.delete('/:id', (req: Request, res: Response) => {
    return res.json({msg: 'DELETE'});
})


module.exports = router;