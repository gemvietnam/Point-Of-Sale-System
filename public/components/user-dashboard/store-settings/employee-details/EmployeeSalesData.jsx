import React, { PropTypes } from 'react';

const EmployeeSalesData = ({ title, salesData }) => {
  return (
    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
      <div className="thumbnail">
        <div className="caption text-center">
          <h4 className="primaryGray">Active Employee's</h4>
          <h5 className="primaryGray">{title}</h5>
          <h2 className="secondaryBlue">{salesData}</h2>
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
