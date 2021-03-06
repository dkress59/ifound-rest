// http://api.iFound.one/photos/
// http://api.iFound.one/photos/avatars

const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
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
		//fileSize: 1024 * 1024 * 2.5
		fileSize: 1024 * 1024 * 12
	},
	fileFilter: fileFilter
})

const http = require('http')
//const fetch = require('cross-fetch')
const phpSendFile = (file, size, type, id, isAva) => {
	const path = (isAva === true)
		? '/upload/user/'
		: '/upload/'
	const options = {
		hostname: process.env.MEDIA_URL.replace(/https?:\/\//, ''),
		port: 80,
		path: path + id + '&type=' + type,
		method: 'POST',
		headers: {
			'Content-Type': 'image/jpeg',
			'Content-Length': size
		}
	}
	callback = function (response) {
		var str = ''
		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function () {
			console.log(str);
		});
	}


	var req = http.request(options, callback);
	if (!req.write(file)) return false;
	req.end();
}

const Photo = require('../models/photo')
const Place = require('../models/place')
const auth = require('../auth/check')


// ALL PHOTOS
router.get('/', (req, res, next) => {
	Photo.find({
			isAvatar: false
		})
		.select('url place')
		//.populate('place', 'name author')
		.exec()
		.then(photos => {
			console.log(photos)
			if (photos.length > 0) {
				const response = {
					message: 'GET request to /photos is good.',
					count: photos.length,
					photos: photos.map(rslt => {
						return {
							_id: rslt._id,
							url: rslt.url,
							place: rslt.place,
							request: {
								type: 'GET',
								url: process.env.REST_URL + `/photos/${rslt._id}`
							}
						}
					})
				}
				res.status(200).json(response)
			} else {
				res.status(200).json({
					message: 'No photos found.',
					photos: []
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

router.post('/', (req, res, next) => {
	Place.findById(req.body.place) // !! KEY !! //
		.then(plc => {
			console.log('req', req.body)
			if (plc) {
				const uid = mongoose.Types.ObjectId()
				const photo = new Photo({
					_id: uid,
					isAvatar: false,
					url: process.env.MEDIA_URL + `/view/${uid}`,
					place: req.body.place,
					//exif: req.body.exif,
					gps: req.body.gps
				})
				plc.photos.push(uid)
				plc.save()
				return photo.save()
			} else {
				return res.status(500).json({
					message: 'Place not found.'
				})
			}
		})
		.then(result => {
			console.log(result)
			res.status(201).json({
				message: 'POST request to /photos is good.',
				newPhoto: {
					_id: result._id,
					isAvatar: result.isAvatar,
					place: result.place,
					url: result.url,
					request: {
						type: 'GET',
						url: process.env.REST_URL + `/photos/${result._id}`
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

// ALL AVATARS
router.get('/avatars', (req, res, next) => {
	Photo.find({
			isAvatar: true
		})
		.select('url place')
		.exec()
		.then(avatars => {
			console.log(avatars)
			if (avatars.length > 0) {
				const response = {
					message: 'GET request to /photos/avatars is good.',
					count: avatars.length,
					avatars: avatars.map(rslt => {
						return {
							_id: rslt._id,
							url: rslt.url,
							place: rslt.place,
							request: {
								type: 'GET',
								url: process.env.REST_URL + `/photos/avatars/${rslt._id}`
							}
						}
					})
				}
				res.status(200).json(response)
			} else {
				res.status(404).json({
					message: 'No avatars found.'
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

router.post('/avatars', upload.single('photoData'), (req, res, next) => {
	console.log('MULTER FILE:', req.file)
	const uid = mongoose.Types.ObjectId()
	const avatar = new Photo({
		_id: uid,
		isAvatar: true,
		url: process.env.MEDIA_URL + `/view/users/${uid}`,
		place: req.body.place
	})
	phpSendFile(req.file.buffer, req.file.size, req.file.mimetype, avatar._id, true);
	avatar.save()
		.then(result => {
			console.log(result)
			res.status(201).json({
				message: 'POST request to /photos/avatars is good.',
				newAvatar: {
					_id: result._id,
					isAvatar: result.isAvatar,
					place: result.place,
					url: result.url,
					request: {
						type: 'GET',
						url: process.env.REST_URL + `/photos/avatars/${uid}`
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


// SINGLE PHOTO
router.get('/:photoID', (req, res, next) => {
	const id = req.params.photoID
	Photo.findById(id)
		.select('url place')
		.populate('place')
		.exec()
		.then(pic => {
			console.log(pic)
			if (pic) {
				res.status(200).json({
					photo: pic,
					request: {
						type: 'GET',
						url: process.env.REST_URL + '/photos'
					}
				})
			} else {
				res.status(404).json({
					message: `Photo with _id ${id} not found.`,
					//error: err
				})
			}
		})
		.catch(err => {
			console.error(err)
			res.status(500).json({
				//message: `Photo with _id ${id} not found.`,
				error: err
			})
		})
})

router.delete('/:photoID', auth, (req, res, next) => {
	const id = req.params.photoID
	Photo.remove({
			_id: id
		})
		.exec()
		.then(result => {
			console.log(result)
			res.status(200).json({
				message: `Photo with _id ${id} successfully deleted.`,
				_id: id,
				request: {
					type: 'POST',
					url: process.env.REST_URL + '/photos',
					body: {
						'url': 'String',
						'isAvatar': 'Boolean (false)',
						'place': 'objectID'
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

// SINGLE AVATAR
router.get('/avatars/:avatarID', (req, res, next) => {
	const id = req.params.avatarID
	Photo.findById(id)
		.populate('place')
		.exec()
		.then(ava => {
			console.log(ava)
			if (ava) {
				res.status(200).json({
					avatar: ava,
					request: {
						type: 'GET',
						url: process.env.REST_URL + '/photos/avatars'
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

// !! also remove from Place !! //
router.delete('/avatars/:avatarID', auth, (req, res, next) => {
	const id = req.params.avatarID
	Photo.remove({
			_id: id
		})
		.exec()
		.then(result => {
			console.log(result)
			res.status(200).json({
				message: `Avatar with _id ${id} successfully deleted.`,
				_id: id,
				request: {
					type: 'POST',
					url: process.env.REST_URL + '/photos/avatars',
					body: {
						'url': 'String',
						'isAvatar': 'Boolean (true)',
						'place': 'objectID'
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


module.exports = router