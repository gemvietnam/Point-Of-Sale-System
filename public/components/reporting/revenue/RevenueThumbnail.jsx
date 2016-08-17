
import React, {Component} from 'react';

const RevenueThumbnail = ({totalRevenue, salesData, name, ChartComponent}) => {

  return (
    <div className="revenueThumbnail">
      <div className="col-lg-12 col-md-12" >
        <div className="thumbnail">
          <ChartComponent salesData={salesData} />
          <div className="caption">
            <h3>{name} Total Revenue: ${totalRevenue}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueThumbnail;
