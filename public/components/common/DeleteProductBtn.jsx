import React, {PropTypes} from 'react';

const DeleteProductBtn = ({ productToDelete, handleDelete }) => {
  return (
    <i id="deleteProductBtn" onClick={() => { handleDelete(productToDelete) }} className="fa fa-trash-o fa-4x" aria-hidden="true"></i>
  );
};

DeleteProductBtn.propTypes = {
  productToDelete: PropTypes.string,
  handleDelete: PropTypes.func
};

export default DeleteProductBtn;
