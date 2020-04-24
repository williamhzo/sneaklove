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

module.exports = router;
