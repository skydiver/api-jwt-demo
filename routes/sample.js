const router = require('express').Router();

import { loginRequired } from '../contollers/usersController';
import { sample } from '../contollers/sampleController';

router.get('/', loginRequired, sample);

module.exports = router;