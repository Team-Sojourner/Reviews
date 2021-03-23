module.exports.modifyRecommend = function (data) {
	let recommendObj = {
		0: 0,
		1: 0,
	};

	data.map((review) => {
		if (review.recommend) {
			recommendObj[1]++;
		} else {
			recommendObj[0]++;
		}
	});

	return recommendObj;
};
