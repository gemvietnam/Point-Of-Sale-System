import React, {PropTypes} from 'react';

const CartHeader = ({ cart, showReceipt}) => {
    if (cart.length === 0) {

			return (
        <div className="cartHeaderSale">
          <h5>Make a Sale</h5>
  				<p><i className="fa fa-plus-square-o fa-3x" aria-hidden="true"></i></p>
        </div>
      );

		} else if (showReceipt){

      return (
        <div className="cartHeaderReceipt">
          <h5>Sale Summary</h5>
  				<p><i className="fa fa-money fa-3x" aria-hidden="true"></i></p>
        </div>
      );

    } else {

			return (
        <div className="cartHeaderActive">
          <h5>Active Cart</h5>
  				<p><i className="fa fa-cart-plus fa-3x" aria-hidden="true"></i></p>
        </div>
      );

		}
};

CartHeader.propTypes = {
  cart: PropTypes.array.isRequired,
  showReceipt: PropTypes.bool.isRequired
};

export default CartHeader;
