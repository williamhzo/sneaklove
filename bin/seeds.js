require('dotenv').config();
require('../config/mongodb');

const mongoose = require('mongoose');
const Sneaker = require('../models/Sneaker');
const Tag = require('../models/Tag');

const sneakers = [
	{
		name: '',
		ref: '',
		sizes: 0,
		description: '',
		price: 0,
		category: 'men',
		id_tags: [],
	},
];
