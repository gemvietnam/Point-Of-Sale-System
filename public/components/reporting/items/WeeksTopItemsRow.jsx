import React, {PropTypes} from 'react';

const WeeksTopItemsRow = ({ item, numSold }) => {
  return (
    <tr>
      <td>{item.itemName}</td>
      <td>{item.itemId}</td>
      <td>${item.price}</td>
      <td>{numSold}</td>
    </tr>
  );
}
WeeksTopItemsRow.propTypes = {
  item: PropTypes.object.isRequired,
  numSold: PropTypes.number.isRequired
};

export default WeeksTopItemsRow;
