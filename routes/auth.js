const router = require('express').Router();

import { login, register } from '../contollers/usersController';

router.post('/register', register);
router.post('/login', login);

module.exports = router;