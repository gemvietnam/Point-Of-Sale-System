import React, {PropTypes} from 'react';
import PlusMinusBtns from 'PlusMinusBtns';
import ProductCategoryIcon from 'ProductCategoryIcon';

const CartProductRow = ({ product, decrementProductInCart, calculateCartTotals,
                          showReceipt, handlePlusBtn, handleMinusBtn,
                          clearProductInCart }) => {

  return (
    <tr key={product._id} className="cartRow wow slideInUp" data-wow-duration="0.5s">
      <td><ProductCategoryIcon category={product.category} /></td>
      <td>{product.name}</td>
      <td>{product.cartQuantity}</td>
      <td>X</td>
      <td>${product.price}</td>
      <td>=</td>
      <td>${product.cartQuantity * product.price}</td>
      <td>
        <PlusMinusBtns
          product={product}
          handlePlusBtn={handlePlusBtn}
          handleMinusBtn={handleMinusBtn}
          showReceipt={showReceipt} />
      </td>
      {showReceipt ? <td><i className="fa fa-check" aria-hidden="true"></i></td> :
       <td id="cartDelete" onClick={() => { clearProductInCart(product); calculateCartTotals(); }}>
       <i className="fa fa-trash-o fa-2x wow rotateInDownRight" aria-hidden="true"></i></td>
      }
    </tr>
  );
};

CartProductRow.propTypes = {
  product: PropTypes.object.isRequired,
  decrementProductInCart: PropTypes.func.isRequired,
  calculateCartTotals: PropTypes.func.isRequired,
  showReceipt: PropTypes.bool.isRequired,
  handlePlusBtn: PropTypes.func.isRequired,
  handleMinusBtn: PropTypes.func.isRequired,
  clearProductInCart: PropTypes.func.isRequired
};

export default CartProductRow;
