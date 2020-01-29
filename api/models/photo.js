const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	url: { type: String, required: true },
	isAvatar: { type: Boolean, default: 0 },
	place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
	//author: String,
	//user: mongoose.Schema.Types.ObjectId,
	exif: { type: Object },
	gps: { type: Object }
});

module.exports = mongoose.model('Photo', photoSchema);