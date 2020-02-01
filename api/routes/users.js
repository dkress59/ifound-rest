// https://iFound.one/api/users

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')


router.post('/signup', (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then(user => {
			if (user.length > 0)
				return res.status(409).json({
					message: `User with e-mail ${req.body.email} already exists`
				})

			bcrypt.hash(req.body.password, 13, (err, hash) => {
				if (err)
					return res.status(500).json({
						error: err
					})
		
				const user = new User({
					_id: mongoose.Types.ObjectId(),
					email: req.body.email,
					password: hash
				})
				user.save()
					.then(result => {
						console.log(result)
						res.status(201).json({
							message: 'POST request to /api/signup is good.'
						})
					})
					.catch(err => {
						console.error(err)
						res.status(500).json({
							error: err
						})
					})
			})
		})
		.catch(err => {
			console.error(err)
			res.status(500).json({
				error: err
			})
		})
})

router.post('/login', (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then(user => {
			if (!user.length)
				return res.status(404).json({
					message: `User ${req.body.email} not found.`
				})
			
			bcrypt.compare(req.body.password, user[0].password, (err, match) => {
				if (err || !match)
					return res.status(401).json({
						message: 'Authorisation has failed.'
					})
				else if (match) {
					const token = jwt.sign(
						{
							_id: user[0]._id,
							email: user[0].email,
						},
						process.env.JWT_KEY,
						//{ expiresIn: 60 * 60 }//1h
						{ expiresIn: 60 * 10 }//10min
					)
					
					//res.set('Set-Cookie','Cokkie1=test')
					res.cookie('cookie1','asefas', { maxAge: 60*60, httpOnly: true })
					return res.status(200).json({
						message: 'Authorisation was successful.',
						token: token
					})
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