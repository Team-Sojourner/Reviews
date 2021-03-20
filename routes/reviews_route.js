const express = require('express');
const router = express.Router();
const db = require('../config/db');
const reviews = require('../models/reviews_model');
const reviews_photos = require('../models/reviews_photos_model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* 
	Table contains: 
	product_id (INT), 
	rating (INT), 
	date (DATE), 
	summary (STRING), 
	body (STRING), 
	recommend (BOOLEAN), 
	report (BOOLEAN), 
	reviewer_name (STRING), 
	reviewer_email (STRING), 
	response (STRING), 
	helpfulness (INTEGER)
*/

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
			let result = {
				product: product_id,
				page: 0,
				count: 5,
				results: resultData.map((item) => {
					let result = {
						review_id: item.id,
						rating: item.rating,
						summary: item.summary,
						recommend: item.recommend,
						response: item.response,
						body: item.body,
						date: item.date,
						reviewer_name: item.reviewer_name,
						helpfulness: item.helpfulness,
						photos: reviewPhotos.filter((photo) => photo.review_id === item.id),
					};
					return result;
				}),
			};
			res.status(200).json(result);
		})
		.catch((err) =>
			console.log('Error with getting data from reviews table: ' + err)
		);
});

module.exports = router;
