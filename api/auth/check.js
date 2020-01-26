const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	const token = (req.headers.authorization.split(" ")[0] === 'Bearer')
		? req.headers.authorization.split(" ")[1]
		: req.body.token
	console.log('token', token)
	try {
		const decoded = jwt.verify(token, process.env.JWT_KEY)// verifies AND decodes
		req.userData = decoded// attaches userData to future requests
		next()
	} catch (err) {
		return res.status(401).json({
			message: 'Authorisation has failed.'
		})
	}
}