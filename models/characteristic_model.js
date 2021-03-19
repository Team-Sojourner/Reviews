const Sequelize = require('sequelize');
const db = require('../config/db');

const characteristic = db.define('characteristic', {
	product_id: {
		type: Sequelize.INTEGER,
	},
	name: {
		type: Sequelize.TEXT,
	},
});

module.exports = characteristic;
