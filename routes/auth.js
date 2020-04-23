const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// SIGN UP
router.get('/signup', (req, res) => {
  res.render('signup.hbs');
});

router.post('/signup', (req, res) => {
  // console.log(req.body);
  const { email, password, name, lastname } = req.body;
  if (email === '' || password === '') {
    res.render('signup.hbs', {
      msg: 'Indicate a email and a password to sign up',
    });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (user !== null) {
        res.render('signup.hbs', {
          msg: 'The email already exists!',
        });
      } else {
        const bcryptSalt = 10;
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = { email, password: hashPass, name, lastname };
        User.create(newUser)
          .then(() => res.redirect('/'))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

// SIGN IN
router.get('/signin', (req, res) => {
  res.render('signin.hbs');
});

router.post('signin', (req, res) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    res.render('login.hbs', {
      msg: 'Please enter both, email and password to sign up.',
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
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
