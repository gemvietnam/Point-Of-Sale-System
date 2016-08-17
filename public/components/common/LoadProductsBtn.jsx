import React, { PropTypes } from 'react';

const LoadProductsBtn = ({ handleLoadProducts }) => {
  return (
    <button id="loadProductsBtn" className="btn" onClick={handleLoadProducts}>
      <i className="fa fa-caret-down fa-3x" aria-hidden="true"></i>
    </button>
  );
};

LoadProductsBtn.propTypes = {
  handleLoadProducts: React.PropTypes.func.isRequired
};

export default LoadProductsBtn;
