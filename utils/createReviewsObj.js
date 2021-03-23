module.exports.createReviewsObj = function (
	resultData,
	reviewPhotos,
	product_id
) {
	let result = {
		product: product_id,
		page: 0,
		count: 5,
		results: resultData.map((item) => {
			return {
				review_id: item.id,
				rating: item.rating,
				summary: item.summary,
				recommend: item.recommend,
				response: item.response,
				body: item.body,
				date: item.date,
				reviewer_name: item.reviewer_name,
				helpfulness: item.helpfulness,
				photos: reviewPhotos.filter((photo) => photo.review_id === item.id),
			};
		}),
	};
	return result;
};
