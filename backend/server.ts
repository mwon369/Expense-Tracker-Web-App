import { Request, Response } from 'express';

require('dotenv').config();
const express = require('express');
const transactionRoutes = require('./routes/transactions');
const userRoutes = require('./routes/users');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use((req: Request, res: Response, next: () => void) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/transactions', transactionRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log(`Listening on PORT ${process.env.PORT}`);
            })
        })
        .catch((error: Error) => {
            console.log(error);
        })