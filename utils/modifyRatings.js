module.exports.modifyRatings = function (data) {
	let ratingObj = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
	};

	data.map((review) => {
		if (review.rating === 1) {
			ratingObj[1]++;
		} else if (review.rating === 2) {
			ratingObj[2]++;
		} else if (review.rating === 3) {
			ratingObj[3]++;
		} else if (review.rating === 4) {
			ratingObj[4]++;
		} else if (review.rating === 5) {
			ratingObj[5]++;
		}
	});

	return ratingObj;
};
