const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');
const Sneaker = require('../models/Sneaker');

router.get('/', (req, res, next) => {
	Tag.find()
		.then((dbResult) => {
			res.status(200).json(dbResult);
		})
		.catch((dbError) => console.log(dbError));
});

router.get('/sneakers/:cat', (req, res, next) => {
	const category = req.params.cat;
	let query = {};
	if (req.params.cat !== 'none') {
		query = { category };
	}

	Sneaker.find(query)
		.then((dbResult) => {
			res.status(200).json(dbResult);
		})
		.catch((dbError) => console.log(dbError));
});

router.get('/:label', (req, res, next) => {
	Tag.findOne({ label: req.params.label })
		.then((dbResult) => {
			res.status(200).json(dbResult);
		})
		.catch((dbError) => console.log(dbError));
});

router.post('/:label', (req, res, next) => {
	Tag.create({ label: req.params.label })
		.then((dbResult) => {
			res.status(201).json(dbResult);
		})
		.catch((dbError) => console.log(dbError));
});

router.delete('/:id', (req, res, next) => {
	Sneaker.findByIdAndDelete(req.params.id)
		.then((dbResult) => {
			res.status(200).json(dbResult);
		})
		.catch((dbError) => console.log(dbError));
});

router.get('/filter/:tags/:category', (req, res, next) => {
	const tagList = req.params.tags.split('-');
	let query = {};
	if (req.params.category === 'none') {
		query = { id_tags: { $in: tagList } };
	} else {
		query = { id_tags: { $in: tagList }, category: req.params.category };
	}
	Sneaker.find(query)
		.then((dbResult) => {
			res.status(200).json(dbResult);
		})
		.catch((dbError) => console.log(dbError));
});

module.exports = router;
