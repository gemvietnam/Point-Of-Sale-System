import React from 'react';
import {Link} from 'react-router';

const AddProductBtn = () => {
  return (
    <Link to="/manageProduct" id="addProductBtn" className="btn btn-default">
      <i className="fa fa-plus fa-2x" aria-hidden="true"></i>
    </Link>
  );
};

export default AddProductBtn;
