const express = require('express');
const router = express.Router();
const db = require('../config/db');
const reviews_photos = require('../models/reviews_photos_model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* 
	Table contains: 
	review_id (FK), 
	url (STRING)
*/

router.get('/', (req, res) => {
	var dummyData = [
		1286879,
		1286880,
		1286881,
		1286882,
		1286883,
		1286884,
		1286885,
		1286886,
		1286887,
		1286888,
		1286889,
	];
	reviews_photos
		.findAll({
			where: {
				review_id: {
					[Op.in]: dummyData,
				},
			},
		})
		.then((data) => {
			return data;
		})
		.catch((err) =>
			console.log('Error with getting data from reviews_photos table: ' + err)
		);
});

module.exports = router;
