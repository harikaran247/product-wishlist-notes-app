const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'fallback_jwt_secret_key_for_development';
  const expire = process.env.JWT_EXPIRE || '30d';
  return jwt.sign({ id }, secret, {
    expiresIn: expire,
  });
};

module.exports = generateToken;