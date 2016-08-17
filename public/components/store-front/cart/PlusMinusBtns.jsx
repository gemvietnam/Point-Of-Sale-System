import React, { Proptypes } from 'react';

const PlusMinusBtns = ({ product, handlePlusBtn, handleMinusBtn, showReceipt }) => {
  return (
    <div id="plusMinusBtns" className={`btn-group btn-group-xs ${showReceipt ? 'hidden' : ''}`} role="group">
      <button id="plusBtn" onClick={()=> { handlePlusBtn(product) }} type="button" className="btn btn-default">
        <i className="fa fa-plus fa-2x" aria-hidden="true"></i>
      </button>
      <button id="minusBtn" onClick={()=> { handleMinusBtn(product) }} type="button" className="btn btn-default">
        <i className="fa fa-minus fa-2x" aria-hidden="true"></i>
      </button>
    </div>
  );
};

// PlusMinusBtns.propTypes = {
//   product: Proptypes.object.isRequired,
//   handlePlusBtn: Proptypes.func.isRequired,
//   handleMinusBtn: Proptypes.func.isRequired
// };

export default PlusMinusBtns;
