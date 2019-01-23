const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const JWT = require('./lib/jwt');

const app = express();

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION, {
  useCreateIndex: true,
  useNewUrlParser: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT middleware
app.use(JWT);

// define routes
app.use('/auth', require('./routes/auth'));
app.use('/sample', require('./routes/sample'));

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.send(`Node and express server is running on port ${process.env.PORT}`)
);

app.listen(process.env.PORT, () =>
  console.log(`your server is running on port ${process.env.PORT}`)
);