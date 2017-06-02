const express = require('express');
const router = express.Router();


//Registration
router.get('/register', (req, res, next) => {
  res.send('REG');
});

//Authentication
router.get('/authenticate', (req, res, next) => {
  res.send('AUTH');
});

//Profile
router.get('/profile', (req, res, next) => {
  res.send('PROF');
});

//Validate
router.get('/validate', (req, res, next) => {
  res.send('validate');
});

module.exports = router;
