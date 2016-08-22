import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { fetchSingleEmployee, loginEmployee, authError } from 'Actions';
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
        <div id="employeeProfilePage" className="container marginTop marginBottom">

          {/* start of main EmployeeProfile bootstrap row */}
          <div className="row">

            {/* include custom back arrow */}
            <div className="col-lg-12 col-md-12">
              <BackArrowBtn route={`/userProfile/${activeUser._id}`} />
            </div>

            <div className="col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3">
              <div id="employeeProfile" className="text-center">

                {/* Start Edit Button */}
                  <i onClick={() => {
                      browserHistory.push(`/editEmployee/${singleEmployee._id}`);
                    }}
                     id="editEmployeeIcon"
                     className="fa fa-pencil-square-o fa-3x"
                     aria-hidden="true"></i>
                {/* End Edit Button */}

                <h1>Employee Profile</h1>
                <i className="fa fa-user-md fa-5x wow flipInY" aria-hidden="true"></i>

                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <label>Name</label>
                    <h3>{singleEmployee.name}</h3>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <label>Position</label>
                    <h3>{singleEmployee.position}</h3>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <label>Email</label>
                    <h3>{singleEmployee.email}</h3>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <label>ID Number</label>
                    <h4>{singleEmployee._id}</h4>
                  </div>
                  <div id="employeeLogin" className="col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3">
                      <h5>{this.props.errorMessage}</h5>
                      <fieldset className="form-group">
                        <label>Email</label>
                        <input
                          type="text"
                          className="form-control"
                          name="employeeEmail"
                          onChange={this.handleUserInput}
                          value={employeeEmail}
                           />
                        <div className="text-help"></div>
                      </fieldset>

                      <fieldset className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="employeePassword"
                          onChange={this.handleUserInput}
                          value={employeePassword} />
                        <div className="text-help"></div>
                      </fieldset>

                    <button onClick={this.handleLogin} className="btn btn-default">Login</button>
                  </div>
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

export default connect(mapStateToProps, { fetchSingleEmployee, loginEmployee, authError })(EmployeeProfileContainer);
