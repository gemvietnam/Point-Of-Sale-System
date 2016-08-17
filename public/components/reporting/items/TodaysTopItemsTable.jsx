import React from 'react';
import TodaysTopItemsRow from 'TodaysTopItemsRow';

const TodaysTopItemsTable = ({items}) => {
	return (
		<div className="table-responsive">
			<table className="table">
				<thead>
					<tr>
						<th>Product Name</th>
						<th>SKU #</th>
						<th>Price</th>
						<th>Number Sold Today</th>
					</tr>
				</thead>
				<tbody>
					{items.map(item => {
						return <TodaysTopItemsRow key={item.item.itemId} item={item.item} numSold={item.occurrences} />
					})}
				</tbody>
			</table>
		</div>
	);
}

export default TodaysTopItemsTable;
