import React, { Component } from 'react';

const ComboBox = ({ name, comboList }) => {

  return (
    <div className="combobox-wrapper">
      <select name={name} className="form-control">
        {
          comboList.map(function(item, i) {
            return (
              <option key={i} value={item.name}>
                {item.name}
              </option>
            );
          })
        }
      </select>
    </div>
  );

};

export default ComboBox;
