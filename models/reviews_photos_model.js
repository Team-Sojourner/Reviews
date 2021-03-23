const Sequelize = require('sequelize');
const db = require('../config/db');

const reviews_photos = db.define('reviews_photos', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	review_id: {
		type: Sequelize.INTEGER,
		references: 'reviews',
		referencesKey: 'id',
	},
	url: {
		type: Sequelize.TEXT,
	},
});

module.exports = reviews_photos;
