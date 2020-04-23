const express = require('express');
const router = express.Router();
const authentificated = require('../middlewares/authenticated');

router.get('/', (req, res) => {
	res.render('index.hbs');
});

router.get('/prod-add', authentificated, (req, res, next) => {
	res.render('products_add', {
		scripts: ['products.js'],
	});
});

router.post('/prod-add', authentificated, (req, res, next) => {
	const newSneaker = {
		name: req.body.name,
		ref: req.body.ref,
		sizes: req.body.sizes,
		description: req.body.description,
		price: req.body.price,
		category: req.body.category,
		id_tags: req.body.tags,
	};

	console.log(newSneaker);
});

router.get('/prod-manage', authentificated, (req, res, next) => {
	res.render('products_manage', {
		scripts: ['products.js'],
	});
});

module.exports = router;
