import React, { PropTypes } from 'react';
import CartProductRow from 'CartProductRow';

const CartProductsTable = ({ cart, decrementProductInCart, calculateCartTotals,
                             showReceipt, handlePlusBtn, handleMinusBtn,
                             clearProductInCart }) => {
  return (
    <table className="table">
      <tbody>
        {cart.map(product => {
          return <CartProductRow
            key={product._id}
            product={product}
            decrementProductInCart={decrementProductInCart}
            calculateCartTotals={calculateCartTotals}
            showReceipt={showReceipt}
            handlePlusBtn={handlePlusBtn}
            handleMinusBtn={handleMinusBtn}
            clearProductInCart={clearProductInCart}
          />;
        })}
      </tbody>
    </table>
  );
};

CartProductsTable.propTypes = {
  cart: PropTypes.array.isRequired,
  decrementProductInCart: PropTypes.func.isRequired,
  calculateCartTotals: PropTypes.func.isRequired,
  showReceipt: PropTypes.bool.isRequired,
  handlePlusBtn: PropTypes.func.isRequired,
  handleMinusBtn: PropTypes.func.isRequired,
  clearProductInCart: PropTypes.func.isRequired
};

export default CartProductsTable;
