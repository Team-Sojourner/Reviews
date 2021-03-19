const Sequelize = require('sequelize');
const db = require('../config/db');

const reviews = db.define('reviews', {
	product_id: {
		type: Sequelize.INTEGER,
	},
	rating: {
		type: Sequelize.INTEGER,
	},
	date: {
		type: Sequelize.DATE,
	},
	summary: {
		type: Sequelize.TEXT,
	},
	body: {
		type: Sequelize.TEXT,
	},
	recommend: {
		type: Sequelize.BOOLEAN,
	},
	reported: {
		type: Sequelize.BOOLEAN,
	},
	reviewer_name: {
		type: Sequelize.TEXT,
	},
	reviewer_email: {
		type: Sequelize.TEXT,
	},
	response: {
		type: Sequelize.TEXT,
	},
	helpfulness: {
		type: Sequelize.INTEGER,
	},
});

module.exports = reviews;
