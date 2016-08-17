var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	owner: { type: Schema.Types.ObjectId, ref: 'User'},
	name: String,
	category: String,
	subCategory: String,
	tax: { type: Number, default: 0 },
	interactions: { type: String, default: 'No interactions listed' },
	healthConditions: { type: String, default: 'No health conditions listed' },
	brand: String,
	locationOfProduct: String,
	manufacturer: String,
	manufacturerCountry: String,
	ingredients: String,
	price: {type: Number, default: 0},
	dosageForm: String,
	typeOfProduct: String,
	quantity: { type: Number, default: 1 },
	description: { type: String, default: "No description available"},
	numTimesSold: { type: Number, default: 0 }
});

module.exports = mongoose.model('Product', ProductSchema);
