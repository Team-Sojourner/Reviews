const express = require('express');
const router = express.Router();
const db = require('../config/db');
const reviews = require('../models/reviews_model');

router.get('/', (req, res) => {
	reviews
		.findAll({
			where: {
				summary: 'This product was ok!',
			},
		})
		.then((data) => {
			console.log(data);
			res.sendStatus(200);
		})
		.catch((err) =>
			console.log('Error with getting data from reviews table: ' + err)
		);
});

module.exports = router;
