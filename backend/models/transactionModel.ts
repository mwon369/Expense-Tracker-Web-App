import { TransactionCategory } from './transactionCategory';
import mongoose from 'mongoose';

interface ITransaction {
    value: number;
    date: Date;
    transactionCategory: TransactionCategory;
    description: string;
    userId: string;
}

export interface ITransactionDocument extends ITransaction, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    value: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    transactionCategory: {
        type: String,
        enum: TransactionCategory,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
    }
}, { timestamps: true })

export default mongoose.model<ITransactionDocument>('Transaction', transactionSchema);