import React, {PropTypes} from 'react';

const TodaysTopItemsRow = ({ item, numSold }) => {
  return (
    <tr>
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
