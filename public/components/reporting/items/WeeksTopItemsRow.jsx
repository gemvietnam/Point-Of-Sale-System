import React, {PropTypes} from 'react';

const WeeksTopItemsRow = ({ item, numSold, rank }) => {
  return (
    <tr>
      <td>{rank + 1}</td>
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
