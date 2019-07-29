module.exports = (req, res, next) => {
	if (req.method === 'POST') {
		req.method = 'GET'; // eslint-disable
		req.query = req.body; // eslint-disable
	}
	next();
};
