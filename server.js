require('dotenv').config();
const express = require('express');
const app = express();
const { PORT } = process.env;
const db = require('./config/db');

// Test DB
db.authenticate()
	.then(() => console.log('DB connected...'))
	.catch((err) => console.log('Error connecting to DB: ' + err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('index.html'));

app.get('/', (req, res) => {
	res.send('Hello');
});

// characteristic_reviews routes
app.use(
	'/characteristic_reviews',
	require('./routes/characteristic_reviews_route')
);

// characteristic routes
app.use('/meta', require('./routes/characteristic_route'));

// reviews routes
app.use('/reviews', require('./routes/reviews_route'));

app.listen(PORT, (err) => {
	if (err) {
		throw err;
	}

	console.log('Listening on port: ' + PORT);
});
