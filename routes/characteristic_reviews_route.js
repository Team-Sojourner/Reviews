const express = require('express');
const router = express.Router();
const db = require('../config/db');
const characteristic_reviews = require('../models/characteristic_reviews_model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* 
	Table contains: 
	characteristic_id (FK), 
	review_id (FK), 
	value (INT)
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
	characteristic_reviews
		.findAll({
			where: {
				review_id: {
					[Op.in]: dummyData,
				},
			},
		})
		.then((data) => {
			res.json(data);
		})
		.catch((err) =>
			console.log(
				'Error with getting data from characteristic_reviews table: ' + err
			)
		);
});

module.exports = router;
