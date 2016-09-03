import React, {PropTypes} from 'react';
import toastr from 'toastr';

const ClearCartBtn = ({ handleClearCart }) => {
  return (
    <div id="clearCart">
      <i onClick={handleClearCart} id="clearCartBtn" className="fa fa-trash primaryGray" aria-hidden="true"></i>
    </div>
  );
};

ClearCartBtn.propTypes = {
  handleClearCart: PropTypes.func.isRequired,
};

export default ClearCartBtn;
