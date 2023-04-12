import { Request, Response } from 'express';

const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/userModel');

const loginUser = async (req: Request, res: Response) => {
    res.json({msg: 'logged in'});
}

const signupUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'All fields must be filled'});
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({
             error: 'Password must be at least 8 characters long,' 
                  + ' contain one uppercase and lowercase letter, one special character and one number'
            });
    }

    const exists = await User.findOne({ username });

    if (exists) {
        return res.status(400).json({ error: `Username '${username}' is already in use.`});
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ username, password: hash });
    res.status(200).json({ username, user });
}

module.exports = { loginUser, signupUser };