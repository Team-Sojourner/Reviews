const Sequelize = require('sequelize');
const db = require('../config/db');
const characteristic = require('./characteristic_model');
const reviews = require('./reviews_model');

const characteristic_reviews = db.define('characteristic_reviews', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		unique: true,
		type: Sequelize.INTEGER,
	},
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

characteristic_reviews.belongsTo(reviews, {
	foreignKey: 'review_id',
});

//characteristic_reviews.sync({ alter: true });

module.exports = characteristic_reviews;
