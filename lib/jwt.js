const jsonwebtoken = require('jsonwebtoken');

const verify = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        req.user = null;
      }
      req.user = decode;
      next();
    });
  } else {
    req.user = null;
    next();
  }
};

const sign = (payload) => {
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
  });
};

module.exports = { verify, sign };