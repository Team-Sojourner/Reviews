const Sequelize = require('sequelize');
const db = require('../config/db');
const characteristic = require('./characteristic_model');

const characteristic_reviews = db.define('characteristic_reviews', {
	characteristic_id: {
		type: Sequelize.INTEGER,
		references: {
			model: 'characteristic',
			key: 'id',
		},
	},
	review_id: {
		type: Sequelize.INTEGER,
		references: {
			model: 'reviews',
			key: 'id',
		},
	},
	value: {
		type: Sequelize.INTEGER,
	},
});

characteristic_reviews.belongsTo(characteristic, {
	foreignKey: 'characteristic_id',
});

module.exports = characteristic_reviews;
