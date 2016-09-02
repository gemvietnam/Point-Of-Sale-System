import React, {PropTypes} from 'react';

const ProductCategoryIcon = ({ category }) => {
  //note that the category property from product is lowercase
  if (category=== "pharmaceutical") {
    return <i className='rowCategoryIcon fa fa-flask pharmaFilter'></i>;
  } else if (category === "herbal") {
    return <i className='rowCategoryIcon fa fa-leaf herbalsFilter'></i>;
  } else if (category === "consumer") {
    return <i className='rowCategoryIcon fa fa-tags consumerFilter'></i>;
  } else {
    return <i className='rowCategoryIcon fa fa-medkit otcFilter'></i>;
  }
};

ProductCategoryIcon.propTypes = {
  category: PropTypes.string.isRequired
};

export default ProductCategoryIcon;
