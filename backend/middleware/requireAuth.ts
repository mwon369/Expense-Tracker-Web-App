import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User, { IUserDocument } from '../models/userModel';

export interface JwtPayloadWithUID extends jwt.JwtPayload {
    _id: string;
}

export interface IRequestWithUserAuth extends Request {
    user: IUserDocument | null;
}

const requireAuth = async (req: IRequestWithUserAuth, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(" ")[1];
    try {
        const { _id } = jwt.verify(token, process.env.SECRET!) as JwtPayloadWithUID;
        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Request is not authorized" });
    }
}

export { requireAuth }; 