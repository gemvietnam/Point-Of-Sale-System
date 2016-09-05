import React from 'react';

const AddEmployeeThumbnail = ({ employeeName, employeeEmail, employeePassword,
                                employeePosition, handleEmployeeInput,
                                addEmployee }) => {
  return (
    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
      <div className="thumbnail">
        <div className="caption">
          <h4 className="title text-center">Add Employee to Store</h4>
          <form onSubmit={addEmployee}>

            <fieldset className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="employeeName"
                onChange={handleEmployeeInput}
                value={employeeName}
                 />
              <div className="text-help"></div>
            </fieldset>

            <fieldset className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                name="employeeEmail"
                onChange={handleEmployeeInput}
                value={employeeEmail} />
              <div className="text-help"></div>
            </fieldset>

            <fieldset className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="employeePassword"
                onChange={handleEmployeeInput}
                value={employeePassword} />
              <div className="text-help"></div>
            </fieldset>

            <fieldset className="form-group">
              <label>Position</label>
              <input
                type="text"
                className="form-control"
                name="employeePosition"
                onChange={handleEmployeeInput}
                value={employeePosition} />
              <div className="text-help"></div>
            </fieldset>

            <button id="addEmployeeBtn" type="submit" className="btn btn-primary">Add</button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeThumbnail;
