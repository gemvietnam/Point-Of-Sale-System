import React, {Component} from 'react';

const TopItemsPanel = ({name, items, TopItemsTable}) => {
  return (
    <div className="col-lg-12 col-md-12">
      <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="chartTitle"><span className="lightOrange">{name}</span> Top Sellers</h3>
      </div>
        <TopItemsTable items={items} />
      </div>
    </div>
  );
};

export default TopItemsPanel;
