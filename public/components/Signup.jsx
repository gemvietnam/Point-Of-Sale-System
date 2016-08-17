import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import { createUser, authError } from 'Actions';
import { Link } from 'react-router';

class Signup extends Component {

	static contextTypes = {
		router: PropTypes.object
	};

	componentWillMount() {
	    if (this.props.authenticated) {
	    	//If the user already has a token in localstorage, it will push onward to inventory when a user visits the signup/login page
	    	//The only problem is there is no active user fetched yet, will need to write a fetch user method
	    	browserHistory.push('/inventory');
	    }
	}

	onSubmit(props) {
		this.props.createUser(props).then(user => {
				// Once the user is created, the user is logged in and the route is pushed
				// to inventory
				if (this.props.authenticated) {
					browserHistory.push('/inventory');
				}

		}).catch(() => {
			this.props.authError('The email you entered is already in use');
		});
	}

	renderError() {
		if (this.props.errorMessage !== "") {
			return (
				<div id="errorAlert" className="text-center">
				  <strong>{this.props.errorMessage}</strong>
				</div>
			);
		}
	}

	render() {
		const { fields: {name, company, email, address, password }, handleSubmit } = this.props;
		// const title = this.props.fields.email in ES5
		return (

			<div>

				<div id="signupPage">

  				<div className="row">

    				<div className="col-lg-4 col-md-4 col-lg-offset-4 col-md-offset-4">

     					{this.renderError()}

      				<h4 className="center">Sign up below</h4>

							<form id="signupInfo" onSubmit={handleSubmit(this.onSubmit.bind(this))}>

								<fieldset className={`form-group ${name.touched && name.invalid ? 'has-danger' : ''}`}>
									<label>Full Name</label>
									<input type="text" className="form-control" {...name} />
									<div className="text-help">
										{name.touched ? name.error : ''}
									</div>
								</fieldset>

								<fieldset className={`form-group ${company.touched && company.invalid ? 'has-danger' : ''}`}>
									<label>Company</label>
									<input type="text" className="form-control" {...company} />
									<div className="text-help">
										{company.touched ? company.error : ''}
									</div>
								</fieldset>

								<fieldset className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
									<label>Email</label>
									<input type="email" className="form-control" {...email} />
									<div className="text-help">
										{email.touched ? email.error : ''}
									</div>
								</fieldset>

								<fieldset className={`form-group ${address.touched && address.invalid ? 'has-danger' : ''}`}>
									<label>Address</label>
									<input type="text" className="form-control" {...address} />
									<div className="text-help">
										{address.touched ? address.error : ''}
									</div>
								</fieldset>

								<fieldset className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}`}>
									<label>Password</label>
									<input type="password" className="form-control" {...password} />
									<div className="text-help">
										{password.touched ? password.error : ''}
									</div>
								</fieldset>

								<button id="signupBtn" type="submit" className="btn btn-primary">Sign Up</button>

							</form>

						</div>
					</div>
				</div>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.name) {
		errors.name = 'Please enter your name';
	}

	if (values.name && values.name.length < 6) {
		errors.name = 'Name must be at least 6 characters long';
	}

	if (!values.company) {
		errors.company = 'Please enter your company name';
	}

	if (!values.email) {
		errors.email = 'Please enter a email';
	}

	if (!values.address) {
		errors.address = 'Please enter an address';
	}

	if (values.address && values.address.length < 8) {
		errors.password = 'Address must be at least 8 characters long';
	}

	if (!values.password) {
		errors.password = 'Please enter a password';
	}
	if (values.password && values.password.length < 7) {
		errors.password = 'Password must be at least 7 characters long';
	}

	return errors;
}

function mapStateToProps(state) {
	return { authenticated: state.user.authenticated, errorMessage: state.user.errorMessage };
}


export default reduxForm({
	form: 'CreateNewUser',
	fields: ['name', 'company', 'email', 'address', 'password'],
	validate								   //These configurations will be added to the application state, so reduxForm is very similar to the connect function.
											   //connect: first argument is mapStateToProps, second is mapDispatchToProps
											   //reduxForm: 1st is form configuration, 2nd is mapStateToProps, 3rd is mapDispatchToProps

}, mapStateToProps, { createUser, authError })(Signup);
