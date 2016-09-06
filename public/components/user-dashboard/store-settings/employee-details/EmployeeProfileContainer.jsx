import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { fetchSingleEmployee, fetchEmployeeForReset, loginEmployee, authError } from 'Actions';
import BackArrowBtn from 'BackArrowBtn';
import LoadingSpinner from 'LoadingSpinner';
import EmployeeSalesData from 'EmployeeSalesData';

class EmployeeProfileContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employeeLoginData: {
        employeeEmail: "",
        employeePassword:""
      }
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
  }

  componentWillMount() {
    // fetch employee from ID in url params
    this.props.fetchSingleEmployee(this.props.params.employeeId);
  }

  handleUserInput(event) {
    const field = event.target.name;
    // define holder object for updating
    let employeeLoginData = this.state.employeeLoginData;
    // update the employee holder object as the user types in the fieldsets
    employeeLoginData[field] = event.target.value;
    // update this.state with the holder object's information
    return this.setState({ employeeLoginData });
  }

  handleLogin() {
    // call the '/loginEmployee' route
    this.props.loginEmployee(this.state).then(response => {
      // check to see if the response contains the error key
      if (response.error) {
        // the response contains an error, show error message
        this.props.authError("Incorrect email or password");
      } else {
        // success, push back to user profile
        browserHistory.push(`/userProfile`);
      }
    });
  }

  handleForgotPassword() {
    // fetches the employee object that's requesting password reset
    this.props.fetchEmployeeForReset(this.props.singleEmployee._id).then(() => {
      browserHistory.push('/requestReset');
    });
  }

  render() {

    const { singleEmployee, activeUser } = this.props;
    const { employeeEmail, employeePassword } = this.state.employeeLoginData;

    if ($.isEmptyObject(singleEmployee)) {
      return (
        <div className="text-center marginTop">
          <LoadingSpinner />
        </div>
      );
    } else {
      return (
        <div className="container marginTop marginBottom">
          <p id="employeeTitle">Employee Profile</p>
          <p id="employeeSubTitle">
            View account information or log in to begin making sales
          </p>
          {/* start of main EmployeeProfile bootstrap row */}
          <div className="row">

            <div id="employeeProfilePage" className="col-lg-12 col-md-12">
              <div className="row">

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <i className="secondaryBlue employeeIcon fa fa-user-md wow flipInY" aria-hidden="true"></i>
                </div>

                <div className="text-center col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  {/* Start Edit Button */}
                  <p id="editEmployee">
                    Edit Employee
                  </p>

                  <i onClick={() => {
                    browserHistory.push(`/editEmployee/${singleEmployee._id}`);
                   }}
                   id="editEmployeeIcon"
                   className="primaryGray fa fa-pencil-square-o fa-4x"
                   aria-hidden="true"></i>
                  {/* End Edit Button */}
                </div>
              </div>{/* .row */}

              <div className="row">
                <div id="employeeInfo" className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <span>Name</span> <p>{singleEmployee.name}</p>

                  <span>Position</span> <p>{singleEmployee.position}</p>

                  <span>Email</span> <p>{singleEmployee.email}</p>

                  <span>ID Number</span> <p id="idNum">{singleEmployee._id}</p>
                </div>
                <div id="employeeLogin" className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <h5 className="error">{this.props.errorMessage}</h5>
                  <fieldset className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      name="employeeEmail"
                      onChange={this.handleUserInput}
                      value={employeeEmail}
                       />
                  </fieldset>

                  <fieldset className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="employeePassword"
                      onChange={this.handleUserInput}
                      value={employeePassword} />
                  </fieldset>

                  <p id="forgotEmployeePass" onClick={this.handleForgotPassword}>Forgot Your Password?</p>
                  <button id="loginEmployeeBtn" onClick={this.handleLogin} className="btn btn-default">Login</button>

                </div>
              </div>





            </div>
          </div>
          {/* End of main EmployeeProfile bootstrap row */}
        </div>
      );
    }
  }

}

function mapStateToProps(state) {
  return { singleEmployee: state.employees.singleEmployee,
           activeEmployee: state.employees.activeEmployee,
           activeUser: state.user.activeUser,
           errorMessage: state.user.errorMessage };
}

export default connect(mapStateToProps, { fetchSingleEmployee, fetchEmployeeForReset, loginEmployee, authError })(EmployeeProfileContainer);
