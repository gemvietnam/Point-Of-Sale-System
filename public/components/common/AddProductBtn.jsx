import React from 'react';
import {Link} from 'react-router';

const AddProductBtn = () => {
  return (
    <Link to="/manageProduct" id="addProductBtn" className="btn btn-default">
      <p id="addProductTitle" className="primaryGray">
        Add A New Product <i className="fa fa-plus" aria-hidden="true"></i>
      </p>
    </Link>
  );
};

export default AddProductBtn;
