// http://api.iFound.one/places

const express = require('express')
const router = express.Router()

const Place = require('../models/place')
const mongoose = require('mongoose')

const Photo = require('../models/photo')
const auth = require('../auth/check')

const fetch = require('cross-fetch')

const exif = require('exif')
const ExifImage = exif.ExifImage

const multer = require('multer')
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/pjpeg') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}
const upload = multer({
	limits: {
		//fileSize: 1024 * 1024 * 2.5
		fileSize: 1024 * 1024 * 12
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
		hostname: process.env.REACT_APP_IFO_MEDIA.replace(/https?:\/\//, ''),
		port: 80,
		path: path + '?id=' + id + '&type=' + type,
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
					&& console.log('phpSendFile response:', JSON.parse(str))
			else
				console.log('phpSendFile response:', JSON.parse(str))
		});
	}


	var req = http.request(options, callback);
	req.write(file)
	req.end()
}



// ALL PLACES
router.get('/', (req, res, next) => {
	Place.find()
		.select('name author avatar created photos lat lng range')
		.exec()
		.then(places => {
			console.log(places)
			if (places.length) {
				const response = {
					message: 'GET request to /places is good.',
					count: places.length,
					places: places.map(plc => {
						return {
							_id: plc._id,
							name: plc.name,
							author: plc.author,
							//avatar: plc.avatar,
							created: plc.created,
							photos: plc.photos,
							lat: plc.lat,
							lng: plc.lng,
							range: plc.range,
							request: {
								type: 'GET',
								url: process.env.REACT_APP_IFO_API + '/places/' + plc._id
							}
						}
					}),
				}
				res.status(200).json(response)
			} else {
				/* res.status(404).json({
					message: 'No places found.'
				}) */
				res.status(200).json({
					message: 'No places found.',
					places: []
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

router.post('/', upload.fields([
	{ name: 'photoData', maxCount: 1 },
	{ name: 'cameraData', maxCount: 1 }
]), (req, res, next) => {
	const plc = new Place({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		author: req.body.author,
		avatar: req.body.avatar,
		lat: req.body.lat,
		lng: req.body.lng,
		range: req.body.range,
		photos: req.body.photos,
		created: req.get('Date'),
		ip: req.ip || req.connection.remoteAddress,
	})
	plc.save()
		.then(result => {
			console.log(result)
			const incoming = (req.files.photoData)
				? req.files.photoData[0]
				: (req.files.cameraData) ? req.files.cameraData[0] : null
			if (incoming && incoming !== null)
				new ExifImage({ image: incoming.buffer }, (error, exifData) => {
					const ex = (exifData && exifData.exif) ? exifData.exif : null
					const gp = (exifData && exifData.gps) ? exifData.gps : null
					if (!exifData) console.error(error)
					fetch(process.env.REACT_APP_IFO_API + '/photos', {
						method: 'post',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							place: result._id,
							exif: ex,
							gps: gp
						})
					})
						.then(response => {
							return response.json()
						})
						.then((obj) => {
							console.log('File upload…')
							const uploadSuccess = (phpRresponse) => {
								console.log('php', phpRresponse)
								if (phpRresponse.status === 500) {
									console.log('…failed!')
									console.error('Upload Error:', phpRresponse)
									Photo.deleteOne({ _id: obj.newPhoto._id })
									return res.status(500).json({ error: phpRresponse })
									//return false
								}
								else {
									console.log('…is good.')
									return res.status(201).json({
										message: 'POST request to /places is good.',
										newPlace: {
											_id: result._id,
											name: result.name,
											author: result.author,
											photos: result.photos,
											avatar: result.avatar,
											lat: result.lat,
											lng: result.lng,
											range: result.range,
											gps: gp,
											request: {
												type: 'GET',
												url: process.env.REACT_APP_IFO_API + '/places/' + result._id
											}
										},
										php: phpRresponse
									})
								}
							}
							if (obj.newPhoto) phpSendFile(incoming.buffer, incoming.size, incoming.mimetype, obj.newPhoto._id, uploadSuccess)
							else console.error(obj.error)// !! Throw an error here !!
						})
				})
			else
				return res.status(201).json({
					message: 'POST request to /places is good.',
					newPlace: {
						_id: result._id,
						name: result.name,
						author: result.author,
						photos: result.photos,
						avatar: result.avatar,
						lat: result.lat,
						lng: result.lng,
						range: result.range,
						request: {
							type: 'GET',
							url: process.env.REACT_APP_IFO_API + '/places/' + result._id
						}
					}
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
						url: process.env.REACT_APP_IFO_API + '/places'
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

router.patch('/:placeID', /* auth, */(req, res, next) => {
	const id = req.params.placeID
	/* let updateOpss = {}
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value
	}
	console.log('updateOps', updateOpss)
	const updateOps = {
		lat:4, lng:4
	} */
	//console.log('GPS',req.body)
	Place.updateOne({
		_id: id
	}, {
		$set: req.body
	})
		.exec()
		.then(result => {
			console.log(result)
			res.status(200).json({
				message: `PATCH request to /places/${id} is good.`,
				updatedPlace: result,
				request: {
					type: 'GET',
					url: process.env.REACT_APP_IFO_API + `/places/${id}`
				}
			})
		})
		.catch(err => {
			console.error(err)
			res.status(500).json({
				updateOps: updateOps,
				error: err
			})
		})
})

router.delete('/:placeID', auth, (req, res, next) => {
	//console.log('DELETE TOKEN', req.headers.authorization)
	const id = req.params.placeID
	Place.find({ _id: id })
		.select('photos')
		.exec()
		.then(result => {
			if (result.length > 0 && result[0].photos.length > 0)
				for (let photo of result[0].photos) {
					Photo.deleteOne({ _id: photo })
						.exec()
					fetch(process.env.REACT_APP_IFO_MEDIA + '/delete/' + photo)
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
					url: process.env.REACT_APP_IFO_API + '/places',
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
					message: `GET request to /places/${id}/photos is good.`,
					count: photos.length,
					photos: photos.map(rslt => {
						return {
							_id: rslt._id,
							url: rslt.url,
							//place: rslt.place,
							request: {
								type: 'GET',
								url: process.env.REACT_APP_IFO_API + `/photos/${rslt._id}`
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