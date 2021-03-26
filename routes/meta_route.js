const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const characteristic_reviews = require('../models/characteristic_reviews_model');
const characteristic = require('../models/characteristic_model');
const reviews = require('../models/reviews_model');
const { modifyRatings } = require('../utils/modifyRatings');
const { modifyRecommend } = require('../utils/modifyRecommend');

router.get('/', (req, res) => {
	//let product_id = 1000;
	let product_id = Math.floor(Math.random() * Math.floor(1000000));
	reviews
		.findAll({
			where: {
				product_id: product_id,
			},
		})
		.then((data) => {
			let reviewIds = data.map((review) => review.id);
			let recommendObj = modifyRecommend(data);
			let ratingObj = modifyRatings(data);
			return Promise.resolve([reviewIds, recommendObj, ratingObj]);
		})
		.then(async ([reviewIds, recommendObj, ratingObj]) => {
			await characteristic_reviews
				.findAll({
					where: {
						review_id: {
							[Op.in]: reviewIds,
						},
					},
					include: [characteristic],
				})
				.then((data) => {
					let resultCharac = {};
					data.map((characteristic) => {
						resultCharac[characteristic.characteristic.name] = {
							id: characteristic.characteristic_id,
							value: characteristic.value,
						};
					});

					let result = {
						product_id: product_id,
						ratings: ratingObj,
						recommended: recommendObj,
						characteristics: resultCharac,
					};
					res.header('Access-Control-Allow-Origin', '*');
					res.send(result);
				})
				.catch((err) =>
					console.log(
						'Error with getting data from characteristic_reviews table: ' + err
					)
				);
		})
		.catch((err) => {
			console.log('Error with getting data from meta table:' + err);
		});
});

module.exports = router;
