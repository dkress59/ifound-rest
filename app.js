const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const placesRoutes = require('./api/routes/places')
const photosRoutes = require('./api/routes/photos')
const usersRoutes = require('./api/routes/users')


mongoose.connect(
	'mongodb+srv://atlastest:' +
	process.env.MONGO_ATLAS_PW +
	'@cluster0-guz2q.mongodb.net/iFound-one?retryWrites=true&w=majority', {
		//useMongoClient: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
)
//mongoose.Promise = global.Promise

app.use(morgan('dev'))
app.use( '/media', express.static('media') )
app.use(bodyParser.urlencoded({ extended: false }) )
app.use(bodyParser.json())


app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	)
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
		return res.status(200).json({})
	}
	next()
})


app.use('/places', placesRoutes)
app.use('/photos', photosRoutes)
app.use('/users', usersRoutes)

app.use('/', (req, res, next) => {
	res.status(200).json({
		message: 'Either go to /places or to /photos'
	})
})

app.use((req, res, next) => {
	const err = new Error('Not found.')
	err.status = 404
	next(err)
})
app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.json({
		error: {
			message: err.message || 'Bad request.'
		}
	})
})


module.exports = app