const express = require('express'); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

router.get('/sneakers/:cat', (req, res) => {
  res.render('product.hbs');
});

router.get('/one-product/:id', (req, res) => {
  res.render('one_product.hbs');
});

module.exports = router;
