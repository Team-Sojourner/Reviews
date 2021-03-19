const express = require('express');
const router = express.Router();
const db = require('../config/db');
const characteristic = require('../models/characteristic_model');

router.get('/', (req, res) => {
	characteristic
		.findAll({
			where: {
				name: 'Fit',
			},
		})
		.then((data) => {
			console.log(data);
			res.sendStatus(200);
		})
		.catch((err) =>
			console.log('Error with getting data from characteristic table: ' + err)
		);
});

module.exports = router;
