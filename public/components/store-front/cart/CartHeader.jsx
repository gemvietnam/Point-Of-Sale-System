import React, {PropTypes} from 'react';

const CartHeader = ({ cart, showReceipt}) => {
    if (cart.length === 0) {

			return (
        <div className="cartHeaderSale">
          <h5>Make a Sale</h5>
          <p><i className="fa fa-plus-square-o fa-2x" aria-hidden="true"></i></p>
        </div>
      );

		} else if (showReceipt){

      return (
        <div className="cartHeaderReceipt">
          <h5>Sale Summary</h5>
  				<p><i className="fa fa-money fa-2x" aria-hidden="true"></i></p>
        </div>
      );

    } else {

			return (
        <div className="cartHeaderActive text-center">
          <i className="fa fa-cart-plus fa-2x" aria-hidden="true"></i>
        </div>
      );

		}
};

CartHeader.propTypes = {
  cart: PropTypes.array.isRequired,
  showReceipt: PropTypes.bool.isRequired
};

export default CartHeader;
