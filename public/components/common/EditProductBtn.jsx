import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';

const EditProductBtn = ({ handleEditProduct, productId, size }) => {
  return (
    <i onClick={()=> {
        handleEditProduct(productId);
      }}
       id="editProductIcon"
       className={`fa fa-pencil-square-o ${size}`}
       aria-hidden="true"></i>
  );
};

EditProductBtn.propTypes = {
  handleEditProduct: PropTypes.func,
  productId: PropTypes.string,
  size: PropTypes.string
};

export default EditProductBtn;
