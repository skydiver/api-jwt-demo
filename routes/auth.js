const router = require('express').Router();

const { login, register } = require('../contollers/usersController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;