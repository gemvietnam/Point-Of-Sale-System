import React, { Component, PropTypes } from 'react';

import { setCartTax, fetchAllEmployees,
         addNewEmployee, logOutActiveEmployee,
         loadEmployeeTodayRevenue, fetchUser } from 'Actions';

import { connect } from 'react-redux';
import TaxThumbnail from 'TaxThumbnail';
import AddEmployeeThumbnail from 'AddEmployeeThumbnail';
import ListEmployeeTabs from 'ListEmployeeTabs';
import ActiveEmployeeThumbnail from 'ActiveEmployeeThumbnail';
import EmployeeSalesData from 'EmployeeSalesData';

class StoreSettingsContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      employee: {
        adminId: this.props.activeUser._id,
        employeeName: '',
        employeeEmail: '',
        employeePassword: '',
        employeePosition: ''
      },
      newTax: 0
  	};

		this.handleTaxChange = this.handleTaxChange.bind(this);
		this.submitTax = this.submitTax.bind(this);
    this.handleEmployeeInput = this.handleEmployeeInput.bind(this);
    this.addEmployee = this.addEmployee.bind(this);
    this.changeFormToEditEmployee = this.changeFormToEditEmployee.bind(this);
  }

  componentWillMount() {
    // incase of page refresh, reload admin (activeUser)
    if ($.isEmptyObject(this.props.activeUser)) {
      this.props.fetchUser();
    }
    // check to see if there is an activeEmployee logged in
    if (!$.isEmptyObject(this.props.activeEmployee)) {
      // load activeEmployee's sales data
      this.props.loadEmployeeTodayRevenue(this.props.activeEmployee._id);
    } else {
      // no active Employee, so load all employees belonging to
      // the admin (activeUser)
      this.props.fetchAllEmployees(this.props.activeUser._id);
    }

  }

  changeFormToEditEmployee() {
    this.setState({
      editEmployee: true
    });
  }

  handleTaxChange(event) {
		this.setState({
			newTax: event.target.value
		});
	}

	submitTax(event) {
		event.preventDefault();
		//this doesnt seem to submit yet
		this.props.setCartTax(this.state.newTax);
	}

  handleEmployeeInput(event) {
    const field = event.target.name;
    let employee = this.state.employee;
    employee[field] = event.target.value;
    return this.setState({ employee });
  }

  addEmployee(event) {
    event.preventDefault();

    // convert employee properties from state into JSON
    const jsonEmployee = JSON.stringify(this.state.employee);

    this.props.addNewEmployee(jsonEmployee).then(() => {

      //reload user's employees
      this.props.fetchAllEmployees(this.props.activeUser._id);
      //reset this.state to an empty employee object
      this.setState({
        employee: {
          adminId: this.props.activeUser._id,
          employeeName: '',
          employeeEmail: '',
          employeePassword: '',
          employeePosition: ''
        }
      });

    });

  }

  renderEmployeeThumbnails() {
    const { activeEmployee } = this.props;
    // checks to see if there is an activeEmployee using the system
    if ($.isEmptyObject(activeEmployee)) {
      // there is not an activeEmployee so give full admin dashboard
      return (
        <div>
          <AddEmployeeThumbnail
            employeeName={this.state.employee.employeeName}
            employeeEmail={this.state.employee.employeeEmail}
            employeePassword={this.state.employee.employeePassword}
            employeePosition={this.state.employee.employeePosition}
            handleEmployeeInput={this.handleEmployeeInput}
            addEmployee={this.addEmployee} />

          <ListEmployeeTabs employees={this.props.employees} />
        </div>
      );
    } else if (activeEmployee !== {}) {
      // There is an active employee so take away admin dashbaord
      // show ActiveEmployee component
      return (
        <div>
          <ActiveEmployeeThumbnail
            employee={activeEmployee}
            logOutActiveEmployee={this.props.logOutActiveEmployee} />
          <EmployeeSalesData
            title={`Revenue Today`}
            salesData={this.props.employeeTodaysRevenue} />
          <EmployeeSalesData
            title={`Number of Sales Today`}
            salesData={this.props.employeeNumSalesToday} />
        </div>
      );
    }

  }

  render() {
    const { activeUser } = this.props;

    return (
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div id="storeSettings" className="panel panel-default">
            <div className="panel-heading text-center"><h3>{activeUser.company} Settings</h3></div>
            <div className="panel-body">

              <TaxThumbnail
                tax={this.props.tax}
                newTax={this.state.newTax}
                handleTaxChange={this.handleTaxChange}
                submitTax={this.submitTax} />

              {this.renderEmployeeThumbnails()}

            </div>
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {

	return { activeUser: state.user.activeUser,
           activeEmployee: state.employees.activeEmployee,
           employeeTodaysRevenue: state.employees.employeeTodaysRevenue,
           employeeNumSalesToday: state.employees.numSalesToday,
           tax: state.cart.tax,
           employees: state.employees.employees
         };
}

export default connect(mapStateToProps,
  { setCartTax, fetchAllEmployees, addNewEmployee,
    logOutActiveEmployee, loadEmployeeTodayRevenue,
    fetchUser })
  (StoreSettingsContainer);
