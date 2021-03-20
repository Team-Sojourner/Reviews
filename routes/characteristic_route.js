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
	characteristic
		.findAll({
			where: {
				product_id: 20000,
			},
		})
		.then((data) => {
			res.send(JSON.stringify(data));
		})
		.catch((err) =>
			console.log('Error with getting data from characteristic table: ' + err)
		);
});

module.exports = router;
