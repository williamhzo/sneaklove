const express = require('express');
const router = new express.Router();

router.get('/signup', (req, res) => {
  res.render('signup.hbs');
});

router.get('/signin', (req, res) => {
  res.render('signin.hbs');
});

module.exports = router;
