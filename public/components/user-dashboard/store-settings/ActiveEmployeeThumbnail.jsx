import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ActiveEmployeeThumbnail = ({ employee, logOutActiveEmployee }) => {
  return (
    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
      <div className="thumbnail activeEmployee">

        <div className="text-center col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <Link to={`/employeeProfile/${employee._id}`}>
            <i className="fa fa-user-md fa-3x" aria-hidden="true"></i>
          </Link>
        </div>

        <div className="text-center col-lg-12 col-md-12 col-sm-12 col-x-12">
          <h4 className="activeHead title">Active Employee</h4>
        </div>

        <div className="text-center col-lg-12 col-md-12" id="activeInfo">
          <span>Name</span>
          <p>{employee.name}</p>
          <span>Position</span>
          <p>{employee.position}</p>
          <span>ID</span>
          <p>{employee._id}</p>
        </div>

        <button
          id="logoutEmployeeBtn"
          className="btn btn-primary"
          onClick={logOutActiveEmployee}>Log Out</button>

      </div>
    </div>
  );
};

ActiveEmployeeThumbnail.propTypes = {
  employee: PropTypes.object,
  logOutActiveEmployee: PropTypes.func
};

export default ActiveEmployeeThumbnail;
