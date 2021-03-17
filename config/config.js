require('dotenv').config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
	development: {
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: 'review_db_dev',
		host: DB_HOST,
		port: 5433,
		dialect: 'postgres',
	},
	test: {
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: 'review_db_test',
		host: DB_HOST,
		port: 5433,
		dialect: 'postgres',
	},
	production: {
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: 'review_db_prod',
		host: DB_HOST,
		port: 5433,
		dialect: 'postgres',
	},
};
