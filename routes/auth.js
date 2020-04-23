const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// SIGN UP
router.get('/signup', (req, res) => {
  res.render('signup.hbs');
});

router.post('/signup', (req, res) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    res.render('signup.hbs', {
      msg: 'Indicate a username and a password to sign up',
    });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (user !== null) {
        res.render('signup.hbs', {
          msg: 'The username already exists!',
        });
      } else {
        const bcryptSalt = 10;
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = { email, password: hashPass };
        User.create(newUser)
          .then(() => res.redirect('/'))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => next(err));
});

// SIGN IN
router.get('/signin', (req, res) => {
  res.render('signin.hbs');
});

router.post('signin', (req, res) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    res.render('login.hbs', {
      msg: 'Please enter both, username and password to sign up.',
    });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.render('login.hbs', {
          msg: 'Invalid credentials',
        });
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect('/');
      } else {
        res.render('login.hbs', {
          msg: 'Invalid credentials',
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
