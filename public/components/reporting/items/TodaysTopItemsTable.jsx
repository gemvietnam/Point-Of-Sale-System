import React from 'react';
import TodaysTopItemsRow from 'TodaysTopItemsRow';

const TodaysTopItemsTable = ({items}) => {
	return (
		<div className="table-responsive">
			<table className="table">
				<thead>
					<tr>
					  <th>Rank</th>
						<th>Product Name</th>
						<th>SKU #</th>
						<th>Price</th>
						<th>Number Sold Today</th>
					</tr>
				</thead>
				<tbody>
					{items.slice(0, 10).map((item, index) => {
						return <TodaysTopItemsRow key={item.item.itemId} rank={index} item={item.item} numSold={item.occurrences} />
					})}
				</tbody>
			</table>
		</div>
	);
}

export default TodaysTopItemsTable;
