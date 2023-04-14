const express = require('express');
const router = express.Router();
import {
    loginUser,
    signUpUser
} from '../controllers/userController';

router.post('/login', loginUser);

router.post('/signup', signUpUser);

module.exports = router;