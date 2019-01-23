const router = require('express').Router();

const { loginRequired } = require('../contollers/usersController');
const { sample } = require('../contollers/sampleController');

router.get('/', loginRequired, sample);

module.exports = router;