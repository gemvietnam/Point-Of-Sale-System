import React, {PropTypes} from 'react';
import toastr from 'toastr';

const UndoSaleBtn = ({ hideReceipt, handleUndoSale, lastSale }) => {
  return (
    <div id="undoSale">
      <h5>Undo Sale</h5>
        <i onClick={() => {
            handleUndoSale(lastSale._id).then(() => {
              toastr.success('Sale Undone!');
              hideReceipt();
            });
          }} id="undoSaleBtn" className="fa fa-undo fa-2x" aria-hidden="true" />
    </div>



  );
};

UndoSaleBtn.propTypes = {
  hideReceipt: PropTypes.func.isRequired,
  handleUndoSale: PropTypes.func.isRequired,
  lastSale: PropTypes.object.isRequired
};

export default UndoSaleBtn;
