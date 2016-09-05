import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from 'Actions';
import LoadProductsBtn from 'LoadProductsBtn';
import ProductSearch from 'ProductSearch';
import AddProductBtn from 'AddProductBtn';
import EditProductBtn from 'EditProductBtn';
import toastr from 'toastr';

class AllProducts extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showProductsNum: 25
		};
		this.handleLoadProducts = this.handleLoadProducts.bind(this);
		this.handleEditProduct = this.handleEditProduct.bind(this);
	}

  componentWillMount() {
		this.props.fetchProducts(); //Fetches all products when the page loads
	}

	handleLoadProducts() {
		const showMoreNum = this.state.showProductsNum + 25;

		this.setState({
			showProductsNum: showMoreNum
		});
	}

	handleEditProduct(productId) {

		// checks to see if an employee is trying to edit a product's info
		if ($.isEmptyObject(this.props.activeEmployee)) {
			// the activeEmployee object is empty so give edit access
			return this.props.fetchSingleProduct(productId).then(() => {
				// return this.context.router.push(`/manageProduct/${productId}`);
				return browserHistory.push(`/manageProduct/${productId}`);
		  });
		} else {
			// the activeEmployee object is not empty so deny edit access
			return toastr.error("Only administrators can edit products");
		}

	}

	render() {
		return (
			<div className="allProducts">

			  <div className="container">
			  	{this.renderProducts()}
			  </div>

			</div>
		);
	}

	renderProducts() {
		//break down into smaller components

			return (
				<div className="allProductsShown">
					<div className="row">
						<div className="col-lg-12">
							<p id="allProductsHead" className="primaryGray">All Products</p>
							<p id="allProductsSubHead" className="primaryGray">
								Search through a complete listing of your products
							</p>
						</div>
						<div className="col-lg-12 col-md-12">
							<div className="panel panel-default">
							<div className="panel-heading">
								<div className="row">
									<div className="col-lg-6 col-md-6">
										<ProductSearch showAll={true} showPharma={false} showHerbals={false} />
									</div>
									<div className="col-lg-6 col-md-6">
										<div className="col-lg-6">
											<p id="addProductTitle" className="primaryGray">Add A New Product</p>
										</div>
										<div className="col-lg-6">
											<AddProductBtn />
										</div>
									</div>
								</div>
							</div>
								<div className="table-responsive">
									<table className="table table-hover">
						    		<tbody>
						    			<tr>
						    				<th>Name</th>
						    				<th>SKU #</th>
						    				<th>Category</th>
						    				<th>Price</th>
						    				<th>Quantity</th>
						    				<th>Edit</th>
						    			</tr>
						    			{this.renderProductsTable()}
										</tbody>
						    	</table>
									<div id="allProductsFooter" className="panel-footer">
										<LoadProductsBtn handleLoadProducts={this.handleLoadProducts} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);

	}

	renderProductsTable() {

		return this.props.allProducts.slice(0, this.state.showProductsNum).map(product => {
			return (
				<tr key={product._id}>
					<td>{product.name}</td>
					<td>{product._id}</td>
					<td>{product.category}</td>
					<td>${product.price}</td>
					<td>{product.quantity}</td>
					<td>
						<EditProductBtn handleEditProduct={this.handleEditProduct} productId={product._id} />
				  </td>
				</tr>
			);
		});

	}



}

function mapStateToProps(state) {
	return {
					 allProducts: state.products.all,
					 activeUser: state.user.activeUser,
				   activeEmployee: state.employees.activeEmployee
				 };
}

export default connect(mapStateToProps, actions)(AllProducts);
