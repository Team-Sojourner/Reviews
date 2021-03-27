const Sequelize = require('sequelize');
const db = require('../config/db');
const reviews = require('./reviews_model');

const reviews_photos = db.define('reviews_photos', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		unique: true,
		type: Sequelize.INTEGER,
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

reviews_photos.belongsTo(reviews, {
	foreignKey: 'review_id',
});

//reviews_photos.sync();

module.exports = reviews_photos;
