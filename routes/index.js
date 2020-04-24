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
				tagFamily: { tags: dbResult },
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
		.then((dbResult) => {
			res.redirect('/prod-manage');
		})
		.catch((dbError) => {
			req.flash('error', 'There was an error creating your Sneaker !');
			res.redirect('/prod-manage');
		});
});

router.get('/prod-manage', authentificated, (req, res, next) => {
	Sneaker.find()
		.then((dbResult) => {
			res.render('products_manage', {
				sneakers: dbResult,
				scripts: ['manage.js'],
			});
		})
		.catch((dbError) => console.log(dbError));
});

router.get('/prod-edit/:id', authentificated, async (req, res, next) => {
	try {
		const tags = await Tag.find();
		const sneaker = await Sneaker.findById(req.params.id);
		let idTags = !sneaker.id_tags ? null : sneaker.id_tags.join('-');
		res.render('product_edit', {
			tags: tags,
			tagFamily: { tags, idTags },
			sneaker,
		});
	} catch (error) {
		next(error);
	}
});

router.post('/prod-edit/:id', authentificated, uploadCloud.single('image'), (req, res, next) => {
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

	Sneaker.findByIdAndUpdate(req.params.id, newSneaker, { new: true })
		.then((dbResult) => {
			res.redirect('/prod-manage');
		})
		.catch((dbError) => console.log(dbError));
});

router.get('/cart', (req, res, next) => {
	console.log(req.session.cartContent);
	res.render('cart');
});

module.exports = router;
