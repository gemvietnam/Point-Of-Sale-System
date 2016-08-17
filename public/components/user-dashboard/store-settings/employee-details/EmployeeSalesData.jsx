import React, { PropTypes } from 'react';

const EmployeeSalesData = ({ title, salesData }) => {
  return (
    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
      <div className="thumbnail">
        <div className="caption text-center">
          <h4>Active Employee's</h4>
          <h5>{title}</h5>
          <h6>{salesData}</h6>
        </div>
      </div>
    </div>
  )
};

EmployeeSalesData.propTypes = {
  title: PropTypes.string,
  salesData: PropTypes.number
};

export default EmployeeSalesData;
