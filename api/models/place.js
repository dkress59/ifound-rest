const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	author: { type: String, required: true },
	//photo: mongoose.Schema.Types.ObjectId,
	photos: Array,
	avatar: mongoose.Schema.Types.ObjectId,
	lat: { type: Number, required: true },
	lng: { type: Number, required: true }
});

module.exports = mongoose.model('Place', placeSchema);