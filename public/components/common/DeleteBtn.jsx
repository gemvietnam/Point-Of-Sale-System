import React, {PropTypes} from 'react';

const DeleteBtn = ({ itemIdToDelete, handleDelete }) => {
  return (
    <i id="deleteBtn"
      onClick={() => { handleDelete(itemIdToDelete) }}
      className="fa fa-trash-o fa-4x"
      aria-hidden="true"></i>
  );
};

DeleteBtn.propTypes = {
  itemIdToDelete: PropTypes.string,
  handleDelete: PropTypes.func
};

export default DeleteBtn;
