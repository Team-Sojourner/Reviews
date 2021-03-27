const Sequelize = require('sequelize');
const db = require('../config/db');

const characteristic = db.define('characteristic', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		unique: true,
		type: Sequelize.INTEGER,
	},
	product_id: {
		type: Sequelize.INTEGER,
	},
	name: {
		type: Sequelize.TEXT,
	},
});

//characteristic.sync();

module.exports = characteristic;
