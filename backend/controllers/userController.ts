import { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import User from '../models/userModel';

require('dotenv').config();

const createToken = (_id: mongoose.ObjectId) => {
    return jwt.sign({ _id }, process.env.SECRET!, { expiresIn: '3d' });
}

const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'All fields must be filled' });
    }

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ error: `Username not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        const token = createToken(user._id);
        return res.status(200).json({ username, token });
    }

    return res.status(400).json({ error: 'Incorrect password' })
}

const signUpUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'All fields must be filled' });
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({
             error: 'Password must be at least 8 characters long,' 
                  + ' contain one uppercase and lowercase letter, one special character and one number'
            });
    }

    const exists = await User.findOne({ username });
    if (exists) {
        return res.status(400).json({ error: `Username '${username}' is already in use` });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ username, password: hash });
    const token = createToken(user._id);
    
    res.status(200).json({ username, token });
}

export { loginUser, signUpUser };