import React, {PropTypes} from 'react';

const ProductFilter = ({showAll, showPharma, showHerbals, showConsumer, showOTC, handleFilter}) => {
  // In order to add the | symbol here, the onClick handler needs to check for a value via the ref system
  // not the innerHTML
  return (
    <form id="filterOptions">
      <ul>
        <li id="filterTitle">Filter</li>
        <li className={`${ showAll ? 'activeBlue' : '' }`} onClick={handleFilter}>All</li>

        <i className='fa fa-flask xsPadRight pharmaFilter'></i>
        <li className={`${ showPharma ? 'activeBlue' : '' }`} onClick={handleFilter}>Pharmaceuticals</li>

        <i className='fa fa-leaf xsPadRight herbalsFilter'></i>
        <li className={`${ showHerbals ? 'activeBlue' : '' }`} onClick={handleFilter}>Herbals</li>

        <i className='fa fa-tags xsPadRight consumerFilter'></i>
        <li className={`${ showConsumer ? 'activeBlue' : '' }`} onClick={handleFilter}>Consumer</li>

        <i className='fa fa-medkit xsPadRight otcFilter'></i>
        <li className={`${ showOTC ? 'activeBlue' : '' }`} onClick={handleFilter}>OTC</li>
      </ul>
    </form>
  );
};

export default ProductFilter;
