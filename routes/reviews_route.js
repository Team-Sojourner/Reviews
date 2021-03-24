const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { createReviewsObj } = require('../utils/createReviewsObj');
const characteristic_reviews = require('../models/characteristic_reviews_model');
const reviews = require('../models/reviews_model');
const reviews_photos = require('../models/reviews_photos_model');

router.get('/', (req, res) => {
	let product_id = 2000;
	// let product_id = Math.floor(Math.random() * Math.floor(1000000));
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
			let reviewResult = createReviewsObj(resultData, reviewPhotos, product_id);

			res.status(200).json(reviewResult);
		})
		.catch((err) =>
			console.log('Error with getting data from reviews table: ' + err)
		);
});

router.post('/', (req, res) => {
	let {
		product_id,
		rating,
		summary,
		body,
		name,
		email,
		photos,
		characteristics,
	} = req.body;

	reviews
		.create({
			product_id: parseInt(product_id),
			rating: parseInt(rating),
			date: new Date(),
			summary,
			body,
			reccomend: true,
			reported: false,
			reviewer_name: name,
			reviewer_email: email,
			response: '',
			helpfulness: 0,
		})
		.then(async (data) => {
			let reviewId = data.dataValues.id;
			let photosArr = [];
			let characteristicArr = [];

			for (let i = 0; i < photos.length; i++) {
				let photosObj = {
					review_id: reviewId,
					url: photos[i],
				};

				photosArr.push(photosObj);
			}

			for (let key in characteristics) {
				let characteristicObj = {
					characteristic_id: parseInt(key),
					review_id: parseInt(reviewId),
					value: parseInt(characteristics[key]),
				};

				characteristicArr.push(characteristicObj);
			}

			try {
				await reviews_photos.bulkCreate(photosArr);
				await characteristic_reviews.bulkCreate(characteristicArr);
				res.sendStatus(201);
			} catch (error) {
				console.error('Error with photos and characteristics: ' + error);
				res.sendStatus(500);
			}
		})
		.catch((err) => {
			console.error('Error creating reviews: ' + err);
			res.sendStatus(500);
		});
});

module.exports = router;
