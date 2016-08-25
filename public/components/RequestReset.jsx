import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { forgotPassword, forgotEmployeePassword } from 'Actions';
import { connect } from 'react-redux';
import toastr from 'toastr';

class RequestReset extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			employeeRequest: false,
      requestEmail: '',
      emailSent: false
		};

		this.handleUpdateFormState = this.handleUpdateFormState.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

  componentWillMount() {
    if (this.props.authenticated && $.isEmptyObject(this.props.employeeToResetPass)) {
			// this is not an employee password reset request
			// the user is already authenticated, so push back to inventory
      browserHistory.push('/inventory');
    } else if (!$.isEmptyObject(this.props.employeeToResetPass)) {
			// this is an employee password reset request
			this.setState({
				employeeRequest: true
			});
		}
  }

	handleSubmit() {
		if (!this.state.employeeRequest) {
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
		} else {
			// this is an employee password reset request
			this.props.forgotEmployeePassword(this.props.employeeToResetPass.email)
			.then(() => {
				this.setState({
					emailSent: true
				});
			});
		}
			
	}

	handleUpdateFormState(event) {
		this.setState({
      [event.target.name]: event.target.value
    });
	}

	render() {
		console.log(this.state);
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
	return { authenticated: state.user.authenticated,
					 employeeToResetPass: state.employees.employeeToResetPass
				 };
}

export default connect(mapStateToProps, { forgotPassword, forgotEmployeePassword })(RequestReset);
