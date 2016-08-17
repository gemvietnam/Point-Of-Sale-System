import React from 'react';
import MonthsTopItemsRow from 'MonthsTopItemsRow';

const MonthsTopItemsTable = ({items}) => {
	return (
		<div className="table-responsive">
			<table className="table">
				<thead>
					<tr>
						<th>Product Name</th>
						<th>SKU #</th>
						<th>Price</th>
						<th>Number Sold This Month</th>
					</tr>
				</thead>
				<tbody>
					{items.map(item => {
						return <MonthsTopItemsRow key={item.item.itemId} item={item.item} numSold={item.occurrences} />
					})}
				</tbody>
			</table>
		</div>
	);
}

export default MonthsTopItemsTable;
