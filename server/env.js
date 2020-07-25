const dotenv = require('dotenv');

dotenv.config();

const env = {
  app: {
    port: process.env.APP_PORT,
    secret: process.env.SECRET_KEY
  }
};

module.exports = env;