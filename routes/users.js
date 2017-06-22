"use strict"
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const config = require('../config/database');

//Registration
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg: 'Failed to register user!'});
    }else{
      res.json({success: true, msg: 'User registered!'});
    }
  });

});

//Authentication
router.post('/authenticate', (req, res, next) => {

  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {

    if(err)
      throw err;

    if(!user){
      return res.json({
        success: false,
        msg: 'User not found'
      });
    }

    User.comparePassword(password, user.password, (err, didMatch) => {

      if(err)
        throw err;

      if(didMatch){

        const token = jwt.sign(user, config.secret,{
          expiresIn: 604800 //Week in secs
        });

        res.json({
          success: true,
          msg: 'JWT '+token,
          name: user.name,
          username: user.username,
          email: user.email
        });

      }else{
        res.json({
          success: false,
          msg: 'Wrong Password'

        });
      }

    });

  });

});

//Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.send({user: req.user});
});

//Validate
router.get('/validate', (req, res, next) => {
  res.send('validate');
});

module.exports = router;
