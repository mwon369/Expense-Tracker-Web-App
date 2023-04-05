import { TransactionCategory } from './transactionCategory';

const mongoose = require('mongoose');
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
    }
}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema);