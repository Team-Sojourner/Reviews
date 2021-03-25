const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const reviews = require('../models/reviews_model');

router.put('/:reveiw_id', (req, res) => {
	reviews
		.update(
			{ helpfulness: Sequelize.literal('helpfulness + 1') },
			{ where: { id: req.params.reveiw_id } }
		)
		.then(() => {
			res.sendStatus(204);
		})
		.catch((err) => {
			res.sendStatus(500);
			console.log('Error with putting help: ' + err.message);
		});
});

module.exports = router;
