import React, {PropTypes} from 'react';

const ProductCategoryIcon = ({ category }) => {
  //note that the category property from product is lowercase
  if (category=== "pharmaceutical") {
    return <i className='rowCategoryIcon fa fa-flask'></i>;
  } else if (category === "herbal") {
    return <i className='rowCategoryIcon fa fa-leaf'></i>;
  } else {
    return <i className='rowCategoryIcon fa fa-tags'></i>;
  }
};

ProductCategoryIcon.propTypes = {
  category: PropTypes.string.isRequired
};

export default ProductCategoryIcon;
