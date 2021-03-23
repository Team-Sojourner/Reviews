const express = require('express');
const router = express.Router();
const db = require('../config/db');
const reviews = require('../models/reviews_model');
const reviews_photos = require('../models/reviews_photos_model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { createReviewsObj } = require('../utils/createReviewsObj');

router.get('/', (req, res) => {
	let product_id = Math.floor(Math.random() * Math.floor(1000000));
	reviews
		.findAll({
			where: {
				product_id: product_id,
			},
		})
		.then((data) => {
			let reviewIds = data.map((review) => review.id);
			let resultData = data;

			return Promise.resolve([reviewIds, resultData]);
		})
		.then(async ([reviewIds, resultData]) => {
			let reviewPhotos = [];
			await reviews_photos
				.findAll({
					where: {
						review_id: {
							[Op.in]: reviewIds,
						},
					},
				})
				.then((data) => {
					reviewPhotos = data;
				});
			return Promise.resolve([resultData, reviewPhotos]);
		})
		.then(([resultData, reviewPhotos]) => {
			let result = createReviewsObj(resultData, reviewPhotos, product_id);

			res.status(200).json(result);
		})
		.catch((err) =>
			console.log('Error with getting data from reviews table: ' + err)
		);
});

module.exports = router;
