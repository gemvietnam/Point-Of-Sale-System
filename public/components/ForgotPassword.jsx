import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { resetPassword } from 'Actions';
import { connect } from 'react-redux';
import toastr from 'toastr';

class ForgotPassword extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			newPassword: '',
      confirmPassword: ''
		};

		this.handleUpdateFormState = this.handleUpdateFormState.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

  componentWillMount() {
    if (this.props.authenticated) {
      browserHistory.push('/inventory');
    }
  }

	handleSubmit() {

    const { resetPassword } = this.props;

    const token = this.props.params.token;
    const newPassword = this.state.newPassword;

    const props = {
      password: newPassword
    };

    resetPassword(props, token)
      .then(() => {
        toastr.success("Your password was successfully changed!");
        browserHistory.push('/');
      })
      .catch((err) => {
        toastr.error("Password could not be changed");
      });

	}

	handleUpdateFormState(event) {
		this.setState({
      [event.target.name]: event.target.value
    });
	}

	render() {

      return (
        <div className="row forgotPassword marginTop">
          <div className="col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3">
            <div className="form-group">

      		  	<div className="form-group">
                <label>New Password</label>
      					<input
      						id="newPassword"
      						className="form-control"
      						type="password"
      						name="newPassword"
      						placeholder="New Password..."
      						onChange={this.handleUpdateFormState} />
      				</div>

      				<div className="form-group">
                <label>Confirm Password</label>
      					<input
      						id="confirmPassword"
      						className="form-control"
      						type="password"
      						name="confirmPassword"
      						placeholder="Confirm Password..."
      						onChange={this.handleUpdateFormState} />
      				</div>

      				<button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>

      			</div>
          </div>
        </div>

  		);

	}

}


function mapStateToProps(state) {
	return { authenticated: state.user.authenticated };
}

export default connect(mapStateToProps, { resetPassword })(ForgotPassword);
