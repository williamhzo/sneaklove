const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.hbs');
});

router.get('/sneakers/:cat', (req, res) => {

});

router.get('/one-product/:id', (req, res) => {

});

router.get('/signup', (req, res) => {

});

router.get('/signin', (req, res) => {

});

module.exports = router;
