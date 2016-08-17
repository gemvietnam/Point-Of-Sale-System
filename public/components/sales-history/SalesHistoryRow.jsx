import React, { PropTypes } from 'react';
import ExpandProductIcon from 'ExpandProductIcon';

const SalesHistoryRow = ({ sale }) => {
  return (
    <tr className="salesHistoryRow wow flipInX">
      <td>{sale._id}</td>
      <td>{sale.date.year} / {sale.date.month + 1} / {sale.date.day}</td>
      <td>${sale.total}</td>
      <td>{sale.items.length >= 2 ? `${sale.items[0].itemName}, ${sale.items[1].itemName}...` : `${sale.items[0].itemName}...`}</td>
      <td><ExpandProductIcon route={`/saleDetails/${sale._id}`}/></td>
    </tr>
  );
};

SalesHistoryRow.propTypes = {
  sale: PropTypes.object
};

export default SalesHistoryRow;
