const mongoose = require('mongoose');
//Schema is used to communicate with mongoose about the specific fields a user will have
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define user model

const userSchema = new Schema({
	//every email must be unique and will be converted to lowercase before being saved
	email: { type: String, unique: true, lowercase: true },

	password: String,

	profile:{
		name: {type: String, default: ''},
		picture: {type: String, default: ''}
	},

	company: { type: String, default: ''},

	admin: {type: Boolean, default: true },

	employees: [{type: Schema.Types.ObjectId, ref: 'Employee'}],

	address: String,

	resetPasswordToken: String,

	resetPasswordExpires: Date

});

userSchema.pre('save', function(next) {
	const user = this; //accessing the specific user model that is about to be saved

	// only rehash the password if the user alters the password!!!!!
	if (user.isModified('password')) {
		// generate a salt then run callback
		bcrypt.genSalt(10, function(err, salt) {

			if (err) { return next(err); }

			// hash (encrypt) our password using the salt
			bcrypt.hash(user.password, salt, null, function(err, hash) {

				if (err) { return next(err); }

				// overwrite plain text password with encrypted password
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

// this.password pulls the user's encrypted password from the database
// bcrypt.compare takes the plain text password a user enters at login and HASHES + SALTS IT AGAIN
// this.password and candidate password are compared (both are hashed version, never decrypted)

userSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {

		if (err) { return callback(err); }

		callback(null, isMatch); //if the passwords are the same, isMatch will be true, otherwise false

	});
}


// Create the model class

const ModelClass = mongoose.model('user', userSchema); //loads the userSchema into mongoose that will be applied to all users and creates the user class.

// Export the model

module.exports = ModelClass;
