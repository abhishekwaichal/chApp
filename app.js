const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/database');

mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected', () => {
  console.log('connected to db: '+config.database);
});

//On error
mongoose.connection.on('error', (err) => {
  console.log('db error: '+err);
});

const app = express();

const users = require('./routes/users');

const port = 5000;

//Index route
app.get('/', (req, res) => {
  res.send('Not a valid route');
});

//Set Static
app.use(express.static(path.join(__dirname, 'public')));

//CORS Middleware
app.use(cors());

//BodyParser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);

//start server
app.listen(port , () => {
  console.log('Server is listenning on port '+ port);
});
