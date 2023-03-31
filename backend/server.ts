import { Request, Response } from 'express';

const express = require('express');
const app = express();

app.get('/', (req: Request, res: Response) => {
    return res.json({msg: '??'});
})

app.listen(3000, () => {
    console.log('Listening on port 3000!');
})