import React from 'react';

const TaxThumbnail = ({ tax, newTax, handleTaxChange, submitTax }) => {
  return (

    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
      <div className="thumbnail">
        <div className="caption">
          <h4 className="text-center">Current Store Tax Rate: {tax}%</h4>
          <form onSubmit={submitTax}>

            <fieldset className="form-group">
              <label>Set Store Tax</label>

              <input value={newTax}
                onChange={handleTaxChange}
                type="number"
                className="form-control"/>

            </fieldset>

            <button type="submit" className="btn btn-primary">Set</button>

          </form>
        </div>
      </div>
    </div>

  );
};

export default TaxThumbnail;
