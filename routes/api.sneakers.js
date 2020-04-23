const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');

router.get('/', (req, res, next) => {
	const query = req.query;
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
	// Tag.create(req.params.label)
	Tag.create({ label: req.params.label })
		.then((dbResult) => {
			res.status(201).json(dbResult);
		})
		.catch((dbError) => console.log(dbError));
});

module.exports = router;
