var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SalesSchema = new Schema(
	{
		owner: { type: Schema.Types.ObjectId, ref: 'User' },

		items: [{
			itemId: { type: Schema.Types.ObjectId, ref: 'Product'},
			itemName: { type: String, default: "no name provided"},
			itemCategory: { type: String, default: "no category provided"},
			cartQuantity: { type: Number, default: 1 },
			price: { type: Number, default: 0 }
		}],

		total: { type: Number, default: 0},

		date: {
			seconds: { type: Number, default: 0 },
			minutes: { type: Number, default: 0 },
			hour: { type: Number, default: 0 },
			day: { type: Number, default: 0 },
			month: { type: Number, default: 0 },
			year: { type: Number, default: 0 },
		},

		soldByEmployee: { type: Schema.Types.ObjectId, ref: 'Employee' }

	},
	{ timestamps: { createdAt: 'created_at' } }
);

module.exports = mongoose.model('Sale', SalesSchema);
