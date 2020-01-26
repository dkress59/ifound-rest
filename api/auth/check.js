const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	console.log('auth headers', req.headers)

	if (req.headers.authorization !== undefined)
		try {
			const decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY)// verifies AND decodes
			//req.userData = decoded// attaches userData to future requests
			next()
		} catch (err) {
			return res.status(401).json({
				message: 'Authorisation has failed.'
			})
		}
	else
		return res.status(420).json({
			message: 'Authorisation has failed: Token is missing.'
		})
}