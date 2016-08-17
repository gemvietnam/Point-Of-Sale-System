import React, { PropTypes } from 'react';
import SingleEmployeeTab from 'SingleEmployeeTab';

const ListEmployeeTabs = ({ employees }) => {
  return (
    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
      <div className="thumbnail">
        <div className="caption">
          <h4 className="text-center">Store Employees</h4>
          <div className="row">
            {employees.map(employee => {
              return <SingleEmployeeTab key={employee._id} employee={employee} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

ListEmployeeTabs.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.object)
};

export default ListEmployeeTabs;
