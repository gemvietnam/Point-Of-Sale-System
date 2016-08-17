import React from 'react';
import WeeksTopItemsRow from 'WeeksTopItemsRow';

const WeeksTopItemsTable = ({items}) => {
	return (
		<div className="table-responsive">
			<table className="table">
				<thead>
					<tr>
						<th>Product Name</th>
						<th>SKU #</th>
						<th>Price</th>
						<th>Number Sold This Week</th>
					</tr>
				</thead>
				<tbody>
					{items.map(item => {
						return <WeeksTopItemsRow key={item.item.itemId} item={item.item} numSold={item.occurrences} />
					})}
				</tbody>
			</table>
		</div>
	);
}

export default WeeksTopItemsTable;
