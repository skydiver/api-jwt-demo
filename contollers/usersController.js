const bcrypt = require('bcrypt');

const JWT = require('../lib/jwt');

const { User } = require('../models/User');

const register = async (req, res) => {
  const newUser = new User(req.body);
  newUser.password = bcrypt.hashSync(req.body.password, 10);
  try {
    const savedUser = await newUser.save();
    savedUser.password = null;
    return res.json(savedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Something went wrong'
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(401).json({
        message: 'Authorization failed. No user found.'
      });
    }

    if (!user.comparePassword(req.body.password, user.password)) {
      res.status(401).json({
        message: 'Authorization failed. Wrong password.'
      });
    }

    return res.json({
      token: JWT.sign({
        _id: user.id,
        email: user.email
      })
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Something went wrong'
    });
  }
};

const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({
      message: 'Unauthorized user.'
    });
  }
};

module.exports = { register, login, loginRequired };