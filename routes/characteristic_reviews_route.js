const express = require('express');
const router = express.Router();
const db = require('../config/db');
const characteristic_reviews = require('../models/characteristic_reviews_model');
const characteristic = require('../models/characteristic_model');
const reviews = require('../models/reviews_model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* 
	Table contains: 
	characteristic_id (FK), 
	review_id (FK), 
	value (INT)
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
			let recommendObj = {
				0: 0,
				1: 0,
			};
			let ratingObj = {
				1: 0,
				2: 0,
				3: 0,
				4: 0,
				5: 0,
			};

			data.map((review) => {
				if (review.recommend) {
					recommendObj[1]++;
				} else {
					recommendObj[0]++;
				}
			});

			data.map((review) => {
				if (review.rating === 1) {
					ratingObj[1]++;
				} else if (review.rating === 2) {
					ratingObj[2]++;
				} else if (review.rating === 3) {
					ratingObj[3]++;
				} else if (review.rating === 4) {
					ratingObj[4]++;
				} else if (review.rating === 5) {
					ratingObj[5]++;
				}
			});
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
						recommend: recommendObj,
						characteristic: resultCharac,
					};
					res.json(result);
				})
				.catch((err) =>
					console.log(
						'Error with getting data from characteristic_reviews table: ' + err
					)
				);
		});
});

module.exports = router;
