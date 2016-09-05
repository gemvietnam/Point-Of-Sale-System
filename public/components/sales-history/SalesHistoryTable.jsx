import React, { PropTypes } from 'react'
import SalesHistoryRow from 'SalesHistoryRow';

const SalesHistoryTable = ({ sales, numSalesShowing }) => {

  return (
		<div className="table-responsive">
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Sale Id</th>
						<th>Sale Date</th>
						<th>Sale Total</th>
						<th>Sale Items</th>
            <th>Expand</th>
					</tr>
				</thead>
				<tbody>
					{sales.slice(0, numSalesShowing).map(sale => {
            //this is still displaying the order incorrectly
						return <SalesHistoryRow key={sale._id} sale={sale} />;
					})}
				</tbody>
			</table>
		</div>
	);
};

SalesHistoryTable.propTypes = {
  sales: PropTypes.arrayOf(React.PropTypes.object),
  numSalesShowing: PropTypes.number.isRequired
};

export default SalesHistoryTable;
