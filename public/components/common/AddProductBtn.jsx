import React from 'react';
import {Link} from 'react-router';

const AddProductBtn = () => {
  return (
    <Link to="/manageProduct" id="addProductBtn" className="btn btn-default">
      <p id="addProductTitle">
        Add A New Product <i className="fa fa-plus primaryGray" aria-hidden="true"></i>
      </p>
    </Link>
  );
};

export default AddProductBtn;
