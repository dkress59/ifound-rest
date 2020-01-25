const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]
		const decoded = jwt.verify(req.body.token, process.env.JWT_KEY)
		req.userData = decoded//implement checks
		next()
	} catch (err) {
		return res.status(401).json({
			message: 'Authorisation has failed.'
		})
	}
}