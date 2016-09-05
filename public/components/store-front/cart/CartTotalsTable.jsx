import React, { PropTypes } from 'react';

const CartTotalsTable = ({ cartSubtotal, tax, cartTotal }) => {
  return (
    <div className="row" id="cartTotals">
      <div className="totalsData col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <p>Sub-total</p>
      </div>
      <div className="totalsData text-right col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <p>${cartSubtotal}</p>
      </div>
      <div className="totalsData col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <p id="discount">Discount</p>
      </div>
      <div className="totalsData text-right col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <p>0%</p>
      </div>
      <div className="totalsData col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <p>Tax</p>
      </div>
      <div className="totalsData text-right col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <p>{tax}%</p>
      </div>
      <div className="actualTotal totalDiv col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <p>Total</p>
      </div>
      <div className="actualTotal totalDiv text-right col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <p>${cartTotal + (cartTotal * tax/100)}</p>
      </div>
    </div>
  );
};

CartTotalsTable.propTypes = {
  cartSubtotal: React.PropTypes.number.isRequired,
  tax: React.PropTypes.number.isRequired,
  cartTotal: React.PropTypes.number.isRequired
};


export default CartTotalsTable;
