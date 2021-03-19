const express = require('express');
const router = express.Router();
const db = require('../config/db');
const reviews_photos = require('../models/reviews_photos_model');

router.get('/', (req, res) => {
	reviews_photos
		.findAll({
			where: {
				url:
					'https://images.unsplash.com/photo-1542574621-e088a4464f7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3028&q=80',
			},
		})
		.then((data) => {
			console.log(data);
			res.sendStatus(200);
		})
		.catch((err) =>
			console.log('Error with getting data from reviews_photos table: ' + err)
		);
});

module.exports = router;
