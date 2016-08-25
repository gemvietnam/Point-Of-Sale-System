var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var EmployeeSchema = new Schema({
	administrator: { type: Schema.Types.ObjectId, ref: 'User'},
	name: String,
  email: String,
	password: String,
  position: String,
	resetPasswordToken: String,
	resetPasswordExpires: Date
});

// On Save Hook, encrypt password

// pre = Before authentication.js saves a user, it will run this function
EmployeeSchema.pre('save', function(next) {

	const employee = this; //accessing the specific user model that is about to be saved

	// generate a salt then run callback
	bcrypt.genSalt(10, function(err, salt) {

		if (err) { return next(err); }

		// hash (encrypt) our password using the salt
		bcrypt.hash(employee.password, salt, null, function(err, hash) {

			if (err) { return next(err); }

			// overwrite plain text password with encrypted password
			employee.password = hash;
			next();
		});
	});
});

// this.password pulls the user's encrypted password from the database
// bcrypt.compare takes the plain text password a user enters at login and HASHES + SALTS IT AGAIN
// this.password and candidate password are compared (both are hashed version, never decrypted)

EmployeeSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {

		if (err) { return callback(err); }

		callback(null, isMatch); //if the passwords are the same, isMatch will be true, otherwise false

	});
}

module.exports = mongoose.model('Employee', EmployeeSchema);
