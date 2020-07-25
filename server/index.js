const express = require('express')
const cors = require('cors');
const env = require('./env');
require('./config/db');

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes/index');
routes(app);

app.use('/', express.static('../client/build'));

const port = env.app.port;
app.listen(port, () => console.log(`server works on port ${port}`));

exports.app = app;