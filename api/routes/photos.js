// https://iFound.one/api/photos/
// https://iFound.one/api/photos/avatars

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Photo = require('../models/photo')
const Place = require('../models/place')


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
								url: `http://localhost:5000/photos/${rslt._id}`
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

router.post('/', (req, res, next) => {
	Place.findById(req.body.place)
		.then(plc => {
			if (plc) {
				const photo = new Photo({
					_id: mongoose.Types.ObjectId(),
					isAvatar: false,
					url: req.body.url,
					place: req.body.place
				})
				plc.photos.push(photo._id)
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
						url: `http://localhost:5000/photos/${result._id}`
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
								url: `http://localhost:5000/photos/avatars/${rslt._id}`
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

router.post('/avatars', (req, res, next) => {
	const avatar = new Photo({
		_id: mongoose.Types.ObjectId(),
		isAvatar: true,
		url: req.body.url,
		place: req.body.place
	})
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
						url: `http://localhost:5000/photos/avatars/${result._id}`
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
						url: 'http://localhost:5000/photos'
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

router.delete('/:photoID', (req, res, next) => {
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
				/* request: {
					type: 'POST',
					url: 'http://localhost:500/photos',
					body: {
						'url': 'String',
						'isAvatar': 'Boolean (false)',
						'place': 'objectID'
					}
				} */
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
						url: 'http://localhost:5000/photos/avatars'
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

router.delete('/avatars/:avatarID', (req, res, next) => {
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
				/* request: {
					type: 'POST',
					url: 'http://localhost:500/photos/avatars',
					body: {
						'url': 'String',
						'isAvatar': 'Boolean (true)',
						'place': 'objectID'
					}
				} */
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