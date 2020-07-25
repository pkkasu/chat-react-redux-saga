const env = require('../env');

const { secret } = env.app;
const expiresIn = '24h';

exports.secret = secret;
exports.expiresIn = expiresIn;