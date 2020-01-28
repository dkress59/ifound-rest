// https://iFound.one/api/places

const express = require('express')
const router = express.Router()

const Place = require('../models/place')
const mongoose = require('mongoose')

const Photo = require('../models/photo')
const auth = require('../auth/check')

const multer = require('multer')
const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'
		) {
		cb(null, true)
	} else {
		cb(null, false)
	}
}
const upload = multer({
	limits: {
		fileSize: 1024 * 1024 * 2.5
	},
	fileFilter: fileFilter
})

const http = require('http')
const phpSendFile = (file, size, type, id, isAva, handle) => {
	const handleResponse = (!handle && typeof isAva === 'function')
		? isAva
		: handle
	const path = (isAva === true)
		? '/upload/user/'
		: '/upload/'
	const options = {
		hostname: "ifoundone.projecd.org",
		port: 80,
		path: path + id + '&type=' + type,
		method: 'POST',
		headers: {
			'Content-Type': type,
			'Content-Length': size
		}
	}
	callback = function (response) {
		var str = ''
		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function () {
			if (handleResponse)
				handleResponse(JSON.parse(str))
			else
				console.log('phpSendFile response:', JSON.parse(str))
		});
	}


	var req = http.request(options, callback);
	req.write(file)
	req.end()
}
const fetch = require('cross-fetch')//not polyfilled



// ALL PLACES
router.get('/', (req, res, next) => {
	Place.find()
		.select('name author avatar photos lat lng')
		.exec()
		.then(places => {
			console.log(places)
			if (places.length > 0) {
				const response = {
					message: 'GET request to /api/places is good.',
					count: places.length,
					places: places.map(plc => {
						return {
							_id: plc._id,
							name: plc.name,
							author: plc.author,
							avatar: plc.avatar,
							photos: plc.photos,
							lat: plc.lat,
							lng: plc.lng,
							request: {
								type: 'GET',
								url: 'http://ifound-rest.herokuapp.com/api/places/' + plc._id
							}
						}
					}),
				}
				res.status(200).json(response)
			} else {
				res.status(404).json({
					message: 'No places found.'
				})
			}
		})
		.catch(err => {
			console.error(err)
			res.status(500).json({
				error: err
			})
		})
})

router.post('/', upload.single('photoData'), (req, res, next) => {
	const plc = new Place({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		author: req.body.author,
		photos: req.body.photos,
		avatar: req.body.avatar,
		lat: req.body.lat,
		lng: req.body.lng
	})
	plc.save()
		.then(result => {
			console.log(result)
			res.status(201).json({
				message: 'POST request to /api/places is good.',
				newPlace: {
					_id: result._id,
					name: result.name,
					author: result.author,
					photos: result.photos,
					avatar: result.avatar,
					lat: result.lat,
					lng: result.lng,
					request: {
						type: 'GET',
						url: 'http://ifound-rest.herokuapp.com/api/places/' + result._id
					}
				}
			})
			if (req.file && req.file !== undefined)
				fetch('https://ifound-rest.herokuapp.com/api/photos', {
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						'place': result._id
					})
				})
				.then(response => {
					return response.json()
				})
				.then((obj) => {
					console.log('File upload…')
					const uploadSuccess = (phpRresponse) => {
						if (phpRresponse.status === 500){
							console.log('…failed!')
							console.error('Upload Error:', phpRresponse)
							Photo.deleteOne({ _id: obj.newPhoto._id })
							return false
						}
						else
							console.log('…is good.')
					}
					phpSendFile(req.file.buffer, req.file.size, req.file.mimetype, obj.newPhoto._id, uploadSuccess)
				})
		})
		.catch(err => {
			console.error(err)
			res.status(500).json({
				error: err,
			})
		})
})

// PLACE
router.get('/:placeID', (req, res, next) => {
	const id = req.params.placeID
	Place.findById(id)
		.exec()
		.then(plc => {
			console.log(plc)
			if (plc) {
				res.status(200).json({
					place: plc,
					request: {
						type: 'GET',
						url: 'http://ifoundone.projecd.org/api/places'
					}
				})
			} else {
				res.status(404).json({
					message: `Place with _id ${id} not found.`,
					//error: err
				})
			}
		})
		.catch(err => {
			console.error(err)
			res.status(500).json({
				//message: `Place with _id ${id} not found.`,
				error: err
			})
		})
})

router.patch('/:placeID', auth, (req, res, next) => {
	const id = req.params.placeID
	const updateOps = {}
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value
	}
	Place.update({
			_id: id
		}, {
			$set: updateOps
		})
		.exec()
		.then(result => {
			console.log(result)
			res.status(200).json({
				message: `PATCH request to /api/places/${id} is good.`,
				//updatedPlace: result,
				request: {
					type: 'GET',
					url: `http://ifound-rest.herokuapp.com/api/places/${id}`
				}
			})
		})
		.catch(err => {
			console.error(err)
			res.status(500).json({
				error: err
			})
		})
})

router.delete('/:placeID', auth, (req, res, next) => {
	const id = req.params.placeID
	Place.find({ _id: id })
		.select('photos')
		.exec()
		.then(result => {
			if (result.length > 0 && result[0].photos.length > 0)
				for (let photo of result[0].photos) {
					Photo.deleteOne({ _id: photo })
						.exec()
					fetch('https://ifoundone.projecd.org/delete/44'+photo)
						//.then(php => { if (php.status !== '204') console.error('Error: ', php) })// ?? //
				}
		})
	Place.deleteOne({
			_id: id
		})
		.exec()
		.then(result => {
			console.log(result)
			res.status(200).json({
				message: `Place with _id ${id} successfully deleted.`,
				_id: id,
				request: {
					type: 'POST',
					url: 'http://ifound-rest.herokuapp.com/api/places',
					body: {
						'name': 'String',
						'author': 'String',
						'lat': 'Number',
						'lng': 'Number'
					}
				}
			})
		})
		.catch(err => {
			console.error(err)
			res.status(500).json({
				error: err
			})
		})
})

router.get('/:placeID/photos', (req, res, next) => {
	const id = req.params.placeID
	Photo.find({ place: id })
		.select('url avatar')
		.exec()
		.then(photos => {
			console.log(photos)
			if (photos.length > 0) {
				const response = {
					message: `GET request to /api/places/${id}/photos is good.`,
					count: photos.length,
					photos: photos.map(rslt => {
						return {
							_id: rslt._id,
							url: rslt.url,
							//place: rslt.place,
							request: {
								type: 'GET',
								url: `http://ifound-rest.herokuapp.com/api/photos/${rslt._id}`
							}
						}
					})
				}
				res.status(200).json(response)
			} else {
				res.status(404).json({
					message: 'No photos found.'
				})
			}
		})
		.catch(err => {
			console.error(err)
			res.status(500).json({
				error: err
			})
		})
})


module.exports = router