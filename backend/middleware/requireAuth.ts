import { Request, Response } from "express";
import jwt = require('jsonwebtoken');
import { Document } from "mongoose";
const User = require('../models/userModel');

export interface JwtPayload extends jwt.JwtPayload {
    _id: string;
}

export interface IRequestWithUserAuth extends Request {
    user: Document;
}

const requireAuth = async (req: IRequestWithUserAuth, res: Response, next: () => void) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(" ")[1];
    try {
        const { _id } = jwt.verify(token, process.env.SECRET!) as JwtPayload;
        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Request is not authorized" });
    }
}

module.exports = requireAuth;