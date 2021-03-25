require('dotenv').config();
const Sequelize = require('sequelize');
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

const config = {
	define: {
		createdAt: 'createdat',
		updatedAt: 'updatedat',
	},
};

module.exports = new Sequelize('review_db_dev', DB_USERNAME, DB_PASSWORD, {
	host: DB_HOST,
	port: 5433,
	dialect: 'postgres',
	operatorAliases: false,
	define: {
		timestamps: false,
		freezeTableName: true,
	},
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});
