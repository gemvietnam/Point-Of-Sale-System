import React, { PropTypes } from 'react';
import LoadingSpinner from 'LoadingSpinner';
import SoldItemThumbnail from 'SoldItemThumbnail';
import moment from 'moment';

const SaleProfile = ({ sale }) => {

  if ($.isEmptyObject(sale)) {

    return <LoadingSpinner />;

  } else {

    const milliseconds = Date.parse(sale.created_at);
    const displayDate = moment(milliseconds).format("DD MMM YYYY hh:mm a");

    return (
      <div id="saleProfile">
        <div className="row">
          <div id="receiptBorder" className="col-lg-6 col-md-6
                                             col-lg-offset-3 col-md-offset-3">

            <div id="saleHeader" className="col-lg-12 col-md-12">
              <h3>Sale Summary</h3>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <h5>Sale ID</h5>
              <h6>{sale._id}</h6>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <h5>Date</h5>
              <h6>{displayDate}</h6>
            </div>

            <div id="saleItems" className="col-lg-12 col-md-12">
              <h4>Items Sold</h4>
              <i id="saleCheckMark" className="fa fa-check-circle-o fa-3x" aria-hidden="true"></i>
              {/*We gonna return a sold item Thumbnail*/}
              <ul>{sale.items.map(
                   item => <li>{item.cartQuantity} {item.itemName} : ${item.price * item.cartQuantity}</li> )}
              </ul>
            </div>

            <div className="col-lg-4 col-md-4">
              <h2>Total</h2>
            </div>
            <div className="col-lg-4 col-md-4 visible-md visible-lg"></div>
            <div className="col-lg-4 col-md-4">
              <h2>${sale.total}</h2>
            </div>
          </div>

        </div>

      </div>
    );

  }
};

SaleProfile.propTypes = {
  sale: PropTypes.object
};

export default SaleProfile;
