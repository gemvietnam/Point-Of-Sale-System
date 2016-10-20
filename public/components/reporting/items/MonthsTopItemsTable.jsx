import React from 'react';
import MonthsTopItemsRow from 'MonthsTopItemsRow';

const MonthsTopItemsTable = ({items}) => {
	return (
		<div className="table-responsive">
			<table className="table">
				<thead>
					<tr>
						<th>Rank</th>
						<th>Product Name</th>
						<th>SKU #</th>
						<th>Price</th>
						<th>Number Sold This Month</th>
					</tr>
				</thead>
				<tbody>
					{items.slice(0, 10).map((item, index) => {
						return <MonthsTopItemsRow key={item.item.itemId} rank={index} item={item.item} numSold={item.occurrences} />
					})}
				</tbody>
			</table>
		</div>
	);
}

export default MonthsTopItemsTable;
