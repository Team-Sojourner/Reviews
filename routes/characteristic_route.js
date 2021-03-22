const express = require('express');
const router = express.Router();
const db = require('../config/db');
const characteristic = require('../models/characteristic_model');

/* 
	Table contains: 
	product_id (INT), 
	name(STRING)
*/

router.get('/', (req, res) => {
	let product_id = Math.floor(Math.random() * Math.floor(1000000));
	characteristic
		.findAll({
			where: {
				product_id: product_id,
			},
		})
		.then((data) => {
			let resultCharac = {};
			data.map((characteristic) => {
				resultCharac[characteristic.name] = {
					id: characteristic.id,
					value: 0,
				};
			});

			let result = {
				product_id: product_id,
				recommend: {},
				characteristic: resultCharac,
			};
			res.json(result);
		})
		.catch((err) =>
			console.log('Error with getting data from characteristic table: ' + err)
		);
});

module.exports = router;
