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
      msg: {
        status: 'error',
        text: 'Indicate a email and a password to sign up',
      },
    });
    return;
  }
  User.findOne({ email: email })
    .then((user) => {
      if (user !== null) {
        res.render('signup.hbs', {
          msg: { status: 'error', text: 'The email already exists!' },
        });
        return;
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

router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    res.render('signin.hbs', {
      msg: {
        status: 'error',
        text: 'Please enter both, email and password to sign up.',
      },
    });
    return;
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.render('signin.hbs', {
          msg: { status: 'error', text: 'Invalid credentials' },
        });
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect('/');
      } else {
        res.render('signin.hbs', {
          msg: { status: 'error', text: 'Invalid credentials' },
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// SIGN OUT
router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

module.exports = router;
