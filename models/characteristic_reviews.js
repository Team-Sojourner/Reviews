const Sequelize = require('sequelize');
const db = require('../config/db');

const characteristic_reviews = db.define('characteristic_reviews', {
	characteristic_id: {
		type: Sequelize.INTEGER,
		references: 'characteristic',
		referencesKey: 'id',
	},
	review_id: {
		type: Sequelize.INTEGER,
		references: 'reviews',
		referencesKey: 'id',
	},
	value: {
		type: Sequelize.INTEGER,
	},
});

module.exports = characteristic_reviews;
