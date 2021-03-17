const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('index.html'));

app.get('/', (req, res) => {
	res.send('Hello');
});

app.listen(port, (err) => {
	if (err) {
		throw err;
	}

	console.log('Listening on port: ' + port);
});
