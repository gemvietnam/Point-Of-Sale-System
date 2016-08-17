import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { forgotPassword } from 'Actions';
import { connect } from 'react-redux';
import toastr from 'toastr';

class RequestReset extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
      requestEmail: '',
      emailSent: false
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
    // user needs to request a reset token via email

    // format data
    const props = {
      email: this.state.requestEmail
    };

    // send reset link
    this.props.forgotPassword(props).then(() => {
      this.setState({
        emailSent: true
      });
    });

	}

	handleUpdateFormState(event) {
		this.setState({
      [event.target.name]: event.target.value
    });
	}

	render() {
    if (this.state.emailSent) {

      return (
        <div className="row marginTop requestReset">
          <div className="col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3 text-center">
            <i id="emailSentIcon" className="fa fa-check-square fa-5x"></i>
            <h2>Please check your email and follow the link to
                reset your password.</h2>
          </div>
        </div>
      );

    } else {

      return (
        <div className="row requestReset">
          <div className="col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3">
            <div className="form-group text-center">

              <label>Email</label>
    					<input
    						id="requestEmail"
    						className="form-control"
    						type="email"
    						name="requestEmail"
    						placeholder="Enter your email address to reset your password"
    						onChange={this.handleUpdateFormState} />

      				<button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>

      			</div>
          </div>
        </div>
      );

    }

	}

}


function mapStateToProps(state) {
	return { authenticated: state.user.authenticated };
}

export default connect(mapStateToProps, { forgotPassword })(RequestReset);
