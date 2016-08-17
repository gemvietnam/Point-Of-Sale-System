import React, { Component, PropTypes } from 'react';
import { loginUser, authError } from 'Actions';
import { connect } from 'react-redux';
import {Link} from 'react-router';

class LoginFormContainer extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			email: "",
			password: ""
		};

		this.handleUpdateFormState = this.handleUpdateFormState.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	static contextTypes = {
		router: PropTypes.object
	};

	handleLogin(event) {
		event.preventDefault();

		const {loginUser, authError} = this.props;

		loginUser(this.state).then(() => {

			if (this.props.authenticated) {
				this.context.router.push('/inventory');
			}

		}).catch(() => {
			authError('Incorrect email or password');
		});

	}

	handleUpdateFormState(event) {
		if (event.target.name === "email") {
			this.setState({ email: event.target.value});
		} else {
			this.setState({ password: event.target.value});
		}
	}

	render() {

		return (

			<form className="navbar-form navbar-right" onSubmit={this.handleLogin}>

		  	<div className="form-group">
					<input
						id="loginEmail"
						className="form-control"
						type="email"
						name="email"
						placeholder="Email"
						onChange={this.handleUpdateFormState} />
				</div>

				<div className="form-group">
					<input
						id="loginPassword"
						className="form-control"
						type="password"
						name="password"
						placeholder="Password"
						onChange={this.handleUpdateFormState} />
				</div>

				<button className="btn btn-primary" type="submit" name="submit">Log In</button>

				<div id="loginError" className="text-help center">
					<Link to="/requestReset">Forgot Your Password?</Link>  {this.props.errorMessage}
				</div>

			</form>

		);

	}

}


function mapStateToProps(state) {
	return { authenticated: state.user.authenticated, errorMessage: state.user.errorMessage };
}

export default connect(mapStateToProps, { loginUser, authError })(LoginFormContainer);
