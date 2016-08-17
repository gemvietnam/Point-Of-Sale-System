import React, { PropTypes } from 'react';

const SoldItemThumbnail = ({ item }) => {
  return (
    <div id="soldItemThumbnail" className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
      <div className="thumbnail">
      <i className="fa fa-envira fa-2x" aria-hidden="true"></i>
        <div className="caption">
          <h3>{item.itemName}</h3>
          <p>Item information</p>
        </div>
      </div>
    </div>
  );
};

SoldItemThumbnail.propTypes = {
  item: PropTypes.object
};

export default SoldItemThumbnail;
