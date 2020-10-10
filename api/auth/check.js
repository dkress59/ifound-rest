const jwt = require('jsonwebtoken')
const { logToConsole } = require('../util')

module.exports = (req, res, next) => {

	if (req.headers.authorization !== undefined)
		try {
			/* const decoded =*/ jwt.verify(req.headers.authorization.split(' ')[1], process.env.IFO_JWT_KEY, { ignoreExpiration: true })// verifies AND decodes
			//req.userData = decoded// attaches userData to future requests
			logToConsole('AUTH success')
			next()
		} catch (err) {
			logToConsole('AUTH fail')
			return res.status(401).json({
				message: 'Authorisation has failed.',
				token: req.headers.authorization.split(' ')[1]
			})
		}
	else
		return res.status(401).json({
			message: 'Authorisation has failed: Token is missing.'
		})
}