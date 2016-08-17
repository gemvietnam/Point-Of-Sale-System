import React, { PropTypes } from 'react';

const CartTotalsTable = ({ cartSubtotal, tax, cartTotal }) => {
  return (
    <table id="cartTotalsTable" className="table">
      <tbody>
        <tr>
  				<td>Subtotal: ${cartSubtotal}</td>
  				<td>Discount: 0%</td>
  				<td>Tax: {tax}%</td>
  				<td>Total: ${cartTotal + (cartTotal * tax/100)}</td>
  			</tr>
      </tbody>
    </table>
  );
};

CartTotalsTable.propTypes = {
  cartSubtotal: React.PropTypes.number.isRequired,
  tax: React.PropTypes.number.isRequired,
  cartTotal: React.PropTypes.number.isRequired
};


export default CartTotalsTable;
