import React, {PropTypes} from 'react';

const ProductFilter = ({showAll, showPharma, showHerbals, showMiscellaneous, handleFilter}) => {
  // In order to add the | symbol here, the onClick handler needs to check for a value via the ref system
  // not the innerHTML
  return (
    <form id="filterOptions">
      <ul>
        <li className={`${ showAll ? 'activeGreen' : '' }`} onClick={handleFilter}>All</li>

        <li className={`${ showPharma ? 'activeGreen' : '' }`} onClick={handleFilter}>Pharmaceuticals</li>

        <li className={`${ showHerbals ? 'activeGreen' : '' }`} onClick={handleFilter}>Herbals</li>

        <li className={`${ showMiscellaneous ? 'activeGreen' : '' }`} onClick={handleFilter}>Miscellaneous</li>
      </ul>
    </form>
  );
};

export default ProductFilter;
