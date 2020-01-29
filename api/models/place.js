const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	author: { type: String, required: true },
	avatar: mongoose.Schema.Types.ObjectId,
	lat: { type: Number, required: true },
	lng: { type: Number, required: true },
	photos: Array,
	created: { type: mongoose.Schema.Types.Date, default: Date.now },
	ip: String
});

module.exports = mongoose.model('Place', placeSchema);