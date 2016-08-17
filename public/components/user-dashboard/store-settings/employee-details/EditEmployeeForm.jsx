import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { fetchSingleEmployee, editExistingEmployee } from 'Actions';

class EditEmployeeForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employee: {}
    };
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
  }
  componentWillMount() {
    // fetch employee from ID in url params
    this.props.fetchSingleEmployee(this.props.params.employeeId).then(() => {

      const { singleEmployee } = this.props;
      // set the singleEmployee's info to this.state for editing
      this.setState({
        employee: Object.assign({}, singleEmployee)
      });

    });
  }
  handleUserInput(event) {
    const field = event.target.name;
    // define holder object for updating
    let employee = this.state.employee;
    // update the employee holder object as the user types in the fieldsets
    employee[field] = event.target.value;
    // update this.state with the holder object's information
    return this.setState({ employee });
  }
  handleSubmitEdit(event) {
    event.preventDefault();

    // convert employee properties from state into JSON
    const jsonEmployee = JSON.stringify(this.state.employee);

    // send the updated employee info from this.state to the server
    this.props.editExistingEmployee(jsonEmployee).then(() => {
      // go back to the employee's profile page to display updated info
      browserHistory.push(`/employeeProfile/${this.props.singleEmployee._id}`);
    });
  }
  handleCancelEdit(event) {
    event.preventDefault();
    browserHistory.push(`/employeeProfile/${this.props.singleEmployee._id}`);
  }
  render() {

    let { name, email, position } = this.state.employee;

    return (
      <div id="editEmployeeForm" className="container marginTop text-center">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3">
            <h4 className="text-center">Edit Employee Information</h4>
            <form onSubmit={this.handleSubmitEdit}>

              <fieldset className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={this.handleUserInput}
                  value={name}
                   />
                <div className="text-help"></div>
              </fieldset>

              <fieldset className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  onChange={this.handleUserInput}
                  value={email} />
                <div className="text-help"></div>
              </fieldset>

              <fieldset className="form-group">
                <label>Position</label>
                <input
                  type="text"
                  className="form-control"
                  name="position"
                  onChange={this.handleUserInput}
                  value={position} />
                <div className="text-help"></div>
              </fieldset>

              <button
                id="submitEmployeeEdits"
                type="submit"
                className="btn btn-primary">Submit Edits</button>
              <button
                id="cancelEmployeeEdits"
                className="btn btn-danger"
                onClick={this.handleCancelEdit}>Cancel</button>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { singleEmployee: state.employees.singleEmployee };
}

export default connect(mapStateToProps, { fetchSingleEmployee, editExistingEmployee })(EditEmployeeForm);
