import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    return res.json({msg: 'GET ALL'});
})

router.get('/:id', (req: Request, res: Response) => {
    return res.json({msg: 'GET ID'});
})

router.post('/', (req: Request, res : Response) => {
    return res.json({msg: 'POST'});
})

router.patch('/:id', (req: Request, res: Response) => {
    return res.json({msg: 'PATCH'});
})

router.delete('/:id', (req: Request, res: Response) => {
    return res.json({msg: 'DELETE'});
})


module.exports = router;