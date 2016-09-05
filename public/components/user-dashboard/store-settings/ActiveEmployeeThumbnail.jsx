import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ActiveEmployeeThumbnail = ({ employee, logOutActiveEmployee }) => {
  return (
    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
      <div className="thumbnail">
        <div className="caption text-center">
          <Link to={`/employeeProfile/${employee._id}`}><i className="fa fa-user-md fa-3x" aria-hidden="true"></i></Link>
          <h3 className="title">Active Employee</h3>
          <label>Name</label>
          <h4>{employee.name}</h4>
          <label>Position</label>
          <h4>{employee.position}</h4>
          <label>ID</label>
          <h4>{employee._id}</h4>
          <button
            className="btn btn-primary"
            onClick={logOutActiveEmployee}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

ActiveEmployeeThumbnail.propTypes = {
  employee: PropTypes.object,
  logOutActiveEmployee: PropTypes.func
};

export default ActiveEmployeeThumbnail;
