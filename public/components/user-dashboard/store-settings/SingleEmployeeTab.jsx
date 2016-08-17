import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const SingleEmployeeTab = ({ employee }) => {
  return (
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 wow flipInY" id="singleEmployee">
      <div className="row">
        <div className="col-lg-12 col-md-12 text-center">
          <Link to={`/employeeProfile/${employee._id}`}><i className="fa fa-user-md fa-3x" aria-hidden="true"></i></Link>
        </div>
        <div className="col-lg-12 col-md-12">
        </div>
        <div className="col-lg-12 col-md-12">
          <p id="employeeName" className="bold">{employee.name}</p>
        </div>
      </div>
    </div>
  );
};

SingleEmployeeTab.propTypes = {
  employee: PropTypes.object
};

export default SingleEmployeeTab;
