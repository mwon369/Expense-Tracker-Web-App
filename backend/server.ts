import { Request, Response } from 'express';

require('dotenv').config();
const express = require('express');
const app = express();
const transactionRoutes = require('./routes/transactions');

app.use(express.json());

app.use((req: Request, res: Response, next: () => void) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/transactions', transactionRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}`);
})