import React, {PropTypes} from 'react';

const ProductFilter = ({showAll, showPharma, showHerbals, showConsumer, showOTC, handleFilter}) => {
  // In order to add the | symbol here, the onClick handler needs to check for a value via the ref system
  // not the innerHTML
  return (
    <form id="filterOptions">
      <ul>
        <li className={`${ showAll ? 'activeGreen' : '' }`} onClick={handleFilter}>All</li>

        <li className={`${ showPharma ? 'activeGreen' : '' }`} onClick={handleFilter}>Pharmaceuticals</li>

        <li className={`${ showHerbals ? 'activeGreen' : '' }`} onClick={handleFilter}>Herbals</li>

        <li className={`${ showConsumer ? 'activeGreen' : '' }`} onClick={handleFilter}>Consumer</li>

        <li className={`${ showOTC ? 'activeGreen' : '' }`} onClick={handleFilter}>OTC</li>
      </ul>
    </form>
  );
};

export default ProductFilter;
