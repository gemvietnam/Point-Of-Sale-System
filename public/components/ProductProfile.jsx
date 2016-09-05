import React, {Component} from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import SingleProduct from 'SingleProduct';
import { fetchSingleProduct, deleteExistingProduct } from 'Actions';
import BackArrowBtn from 'BackArrowBtn';
import EditProductBtn from 'EditProductBtn';
import toastr from 'toastr';

class ProductProfile extends Component {
	constructor(props) {
		super(props);
		this.handleEditProduct = this.handleEditProduct.bind(this);
	}

	componentWillMount() {
		this.props.fetchSingleProduct(this.props.params.id);
	}

	handleEditProduct(productId) {
		// checks to see if an employee is trying to edit a product's info
		if ($.isEmptyObject(this.props.activeEmployee)) {
			// the activeEmployee object is empty so give edit access
			return this.props.fetchSingleProduct(productId).then(() => {
				// push to the edit page
				return browserHistory.push(`/manageProduct/${productId}`);
		  });
		} else {
			// the activeEmployee object is not empty so deny edit access
			return toastr.error("Only administrators can edit products");
		}

	}

	render() {

		const { singleProduct } = this.props;

		if (this.props.singleProduct) {

			return (
				<div id="productProfile">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 col-md-12">
								<div className="panel panel-default">
									<div className="panel-heading">
										<div className="row">
	                    <div id="productBackArrow" className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
												<BackArrowBtn route='inventory' />
	                    </div>
	                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center">
	                      <h3 className="primaryGray">{singleProduct.name} Profile</h3>
	                    </div>
											<div id="productEditIcon" className="col-lg-4 col-md-4 col-sm-4 col-xs-4">

												<EditProductBtn handleEditProduct={this.handleEditProduct}
																				productId={singleProduct._id}
																				size='fa-4x' />
	                    </div>
	                  </div>
									</div>
									<div className="table-responsive">
										<table className="table table-condensed">
											<tbody>
												<tr>
													<th>SKU #</th>
													<th>Name</th>
													<th>Category</th>
													<th>Sub-Category</th>
												</tr>
												<tr>
													<td>{singleProduct._id}</td>
													<td>{singleProduct.name}</td>
													<td>{singleProduct.category}</td>
													<td>{singleProduct.subCategory}</td>
												</tr>
												<tr>
													<th>Brand</th>
													<th>Location Of Product</th>
													<th>Manufacturer</th>
													<th>Manufacturer's Country</th>
												</tr>
												<tr>
													<td>{singleProduct.brand}</td>
													<td>{singleProduct.locationOfProduct}</td>
													<td>{singleProduct.manufacturer}</td>
													<td>{singleProduct.manufacturerCountry}</td>
												</tr>
												<tr>
													<th>Ingredients</th>
													<th>Price</th>
													<th>Dosage Form</th>
													<th>Type of Product</th>
												</tr>
												<tr>
													<td>{singleProduct.ingredients}</td>
													<td>${singleProduct.price}</td>
													<td>{singleProduct.dosageForm}</td>
													<td>{singleProduct.typeOfProduct}</td>
												</tr>
												<tr>
													<th>Quantity</th>
													<th>Tax</th>
													<th>Interactions</th>
													<th>Health Conditions</th>
												</tr>
												<tr>
													<td>{singleProduct.quantity}</td>
													<td>{singleProduct.tax}</td>
													<td>{singleProduct.interactions}</td>
													<td>{singleProduct.healthConditions}</td>
												</tr>
												<tr>
													<th>Description</th>
												</tr>
												<tr>
													<td>{singleProduct.description}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);

		}

	}
};

function mapStateToProps(state) {
	return {
					 singleProduct: state.products.singleProduct,
					 activeUser: state.user.activeUser,
				   activeEmployee: state.employees.activeEmployee
				 };
}


export default connect(mapStateToProps, { fetchSingleProduct, deleteExistingProduct })(ProductProfile);
