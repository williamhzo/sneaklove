const express = require('express');
const router = express.Router();
const authentificated = require('../middlewares/authenticated');
const uploadCloud = require('../config/cloudinary.js');
const Tag = require('../models/Tag');
const Sneaker = require('../models/Sneaker');

router.get('/', (req, res) => {
	res.render('index.hbs');
});

router.get('/prod-add', authentificated, (req, res, next) => {
	Tag.find()
		.then((dbResult) => {
			res.render('products_add', {
				msg: { status: 'error', text: req.flash('error') },
				scripts: ['products.js'],
				tags: dbResult,
			});
		})
		.catch((dbError) => next(dbError));
});

router.post('/prod-add', authentificated, uploadCloud.single('image'), (req, res, next) => {
	const newSneaker = {
		name: req.body.name,
		ref: req.body.ref,
		sizes: req.body.sizes,
		description: req.body.description,
		price: req.body.price,
		category: req.body.category,
		id_tags: req.body.id_tags,
	};

	if (req.file) newSneaker.image = req.file.secure_url;

	Sneaker.create(newSneaker)
		.then((dbResult) => {})
		.catch((dbError) => {
			req.flash('error', 'There was an error creating your Sneaker !');
			res.redirect('/prod-add');
		});
});

router.get('/prod-manage', authentificated, (req, res, next) => {
	res.render('products_manage', {
		scripts: ['products.js'],
	});
});

module.exports = router;
