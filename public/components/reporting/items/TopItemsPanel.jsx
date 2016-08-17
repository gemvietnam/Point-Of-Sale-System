import React, {Component} from 'react';

const TopItemsPanel = ({name, items, TopItemsTable}) => {
  return (
    <div className="col-lg-12 col-md-12">
      <div className="panel panel-default">
      <div className="panel-heading">{name} Top Sellers</div>
        <TopItemsTable items={items} />
      </div>
    </div>
  );
};

export default TopItemsPanel;
