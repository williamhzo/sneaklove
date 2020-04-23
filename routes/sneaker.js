const express = require('express'); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

const isAuth = require('../middlewares/authenticated');

// Loading models to call later
const Tag = require('../models/Tag');
const Sneaker = require('../models/Sneaker');

router.get('/collection', (req, res, next) => {
  // Async function to make multiple db queries
  async function getProducts() {
    try {
      // Store all tags in : tags
      const tags = await Tag.find()
        .then((dbResult) => dbResult)
        .catch((dbError) => next(dbError));
      // Store all sneakers from the database in : sneakers
      const sneakers = await Sneaker.find()
        .then((dbResult) => dbResult)
        .catch((dbError) => next(dbError));

      // Render the products page with all sneakers !
      res.render('products', {
        tags,
        sneakers,
      });
    } catch (error) {
      next(error);
    }
  }

  // Execute the async function
  getProducts();
});

router.get('/:cat', (req, res) => {
  const category = req.params.cat;
  // Async function to make multiple db queries
  async function getCategory() {
    try {
      // Store all tags in : tags
      const tags = await Tag.find()
        .then((dbResult) => dbResult)
        .catch((dbError) => next(dbError));
      // Store all sneakers from the category in : sneakers
      const sneakers = await Sneaker.find({ category })
        .then((dbResult) => dbResult)
        .catch((dbError) => next(dbError));

      // Render the products page of the category
      res.render('products', {
        category,
        tags,
        sneakers,
      });
    } catch (error) {
      next(error);
    }
  }

  // Execute the async function
  getCategory();
});

// router.get('/one-product/:id', (req, res) => {
//   res.render('one_product.hbs');
// });

module.exports = router;
