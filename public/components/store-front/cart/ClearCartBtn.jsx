import React, {PropTypes} from 'react';
import toastr from 'toastr';

const ClearCartBtn = ({ handleClearCart }) => {
  return (
    <div id="clearCart">
      <h5>Clear Cart</h5>
      <i onClick={handleClearCart} id="clearCartBtn" className="fa fa-retweet fa-2x" aria-hidden="true"></i>
    </div>
  );
};

ClearCartBtn.propTypes = {
  handleClearCart: PropTypes.func.isRequired,
};

export default ClearCartBtn;
