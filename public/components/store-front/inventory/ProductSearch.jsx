import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchProducts, searchPharma, searchHerbals, searchMiscellaneous } from 'Actions';

class ProductSearch extends Component {

	handleSearch(event) { //context of this component needs to be bound to handleSearch when it's called from the input element

		// //This will pull the products up based on the current search query, they are entered as a query parameter

		if (this.props.showAll) {

			this.props.searchProducts(event.target.value);

		} else if (this.props.showPharma) {

			this.props.searchPharma(event.target.value);

		} else if (this.props.showHerbals) {

			this.props.searchHerbals(event.target.value);

		} else if (this.props.showMiscellaneous) {

			this.props.searchMiscellaneous(event.target.value);

		}


	}

	render() {
		return (
			<div id="productSearch" className="input-group">
				<span className="input-group-addon">
					<i className="fa fa-search fa-2x" aria-hidden="true"></i>
				</span>
	  	  <input
	  	  	className="form-control"
	  	  	type="text"
		  	  name="search_term"
		  	  placeholder="Search for a product by name..."
		  	  onChange={this.handleSearch.bind(this)}
	  	  />
			</div>
		);
	}

};

export default connect(null, { searchProducts, searchPharma,
															 searchHerbals, searchMiscellaneous })(ProductSearch);
