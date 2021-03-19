const express = require('express');
const router = express.Router();
const db = require('../config/db');
const characteristic_reviews = require('../models/characteristic_reviews_model');

router.get('/', (req, res) => {
	characteristic_reviews
		.findAll({
			where: {
				value: 2,
			},
		})
		.then((data) => {
			console.log(data);
			res.sendStatus(200);
		})
		.catch((err) =>
			console.log(
				'Error with getting data from characteristic_reviews table: ' + err
			)
		);
});

module.exports = router;
