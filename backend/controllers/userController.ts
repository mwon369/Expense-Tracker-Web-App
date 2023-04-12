import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';

require('dotenv').config();
import bcrypt = require('bcrypt');
import jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/userModel');

const createToken = (_id: ObjectId) => {
    const secret = process.env.SECRET;
    return secret ? jwt.sign({ _id }, secret, { expiresIn: '3d' }) : null;
}

const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'All fields must be filled' });
    }

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ error: 'Incorrect username' });
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

module.exports = { loginUser, signUpUser };