import { Request, Response } from 'express';
import { IRequestWithUserAuth } from '../middleware/requireAuth';
import mongoose from 'mongoose';
import Transaction from '../models/transactionModel';

const getAllTransactions = async (req: IRequestWithUserAuth, res: Response) => {
    const userId = req.user?._id;
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });
    res.status(200).json(transactions);
}

const getSingleTransactionByID = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid transaction ID'});
    }

    const transaction = await Transaction.findById(id);
    if (!transaction) {
        return res.status(404).json({ error: 'Transaction does not exist'});
    }

    res.status(200).json(transaction);
}

const createNewTransaction = async (req: IRequestWithUserAuth, res: Response) => {
    const { value, date, transactionCategory, description } = req.body;

    try {
        const userId = req.user?._id;
        const transaction = await Transaction.create({ value, date, transactionCategory, description, userId });
        res.status(200).json(transaction);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
}

const updateSingleTransactionByID = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid transaction ID'});
    }

    const transaction = await Transaction.findByIdAndUpdate(id, { ...req.body });
    if (!transaction) {
        return res.status(404).json({ error: 'Transaction does not exist'});
    }

    res.status(200).json(transaction);
}

const deleteSingleTransactionByID = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid transaction ID'});
    }

    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
        return res.status(404).json({ error: 'Transaction does not exist'});
    }

    res.status(200).json(transaction);
}

export {
    getAllTransactions,
    getSingleTransactionByID,
    createNewTransaction,
    updateSingleTransactionByID,
    deleteSingleTransactionByID
}