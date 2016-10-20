import React, {PropTypes} from 'react';

const TodaysTopItemsRow = ({ item, numSold, rank }) => {
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
TodaysTopItemsRow.propTypes = {
  item: PropTypes.object.isRequired,
  numSold: PropTypes.number.isRequired
};

export default TodaysTopItemsRow;
