import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import toastr from 'toastr';
import { createProduct, fetchSingleProduct, editExistingProduct, deleteExistingProduct } from 'Actions';
import BackArrowBtn from 'BackArrowBtn';
import DeleteBtn from 'DeleteBtn';
import _ from 'lodash';
import { FIELDS } from '../config/config.js';

class ManageProductForm extends Component {

	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props) {
  	super(props);

  	this.state = {
      isEditForm: false,
      isNewForm: false,
      product: {},
      errors: {}
    };

		this.renderField = this.renderField.bind(this);
		this.handleFieldEdit = this.handleFieldEdit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
  }
	componentWillMount() {
		if (this.props.params.productId) {

			this.setState({ isEditForm: true });

  		this.props.fetchSingleProduct(this.props.params.productId);

		} else {

      this.setState({
        isNewForm: true
      });
		}
	}
	componentDidMount() {

		this.setState({
			product: Object.assign({}, this.props.singleProduct)
		});

	}

	handleDeleteProduct(productId) {
		this.props.deleteExistingProduct(productId).then(() => {
			browserHistory.push('/allProducts');
			setTimeout(function(){ toastr.success("Product deleted"); }, 2000);
		});
	}

	validate(values) {

		//Check for errors and assign them to errors object in local state

		return new Promise((resolve, reject) => {

			const errors = {};
			const numberRegex = /^-?\d+\.?\d*$/;

			_.each(FIELDS, (config, field) => {
				if (!values[field]) {
					errors[field] = `Please Enter ${config.label}`;
				}
				if (!numberRegex.test(values['price'])) {
				    errors['price'] = 'Please enter a number';
				}
				if (!numberRegex.test(values['quantity'])) {
					errors['quantity'] = 'Please enter a number';
				}
				if (!numberRegex.test(values['tax'])) {
					errors['tax'] = 'Please enter a number';
				}
			});
			this.setState({
				errors
			}, () => {
				resolve(this.state);
			});

		});


	}

	handleFieldEdit(event) {
    const field = event.target.name;
		let product = this.state.product;
		product[field] = event.target.value;
		return this.setState({ product });

	}

	handleSubmit(event) {

		event.preventDefault();

		this.validate(this.state.product).then(() => {
			if (_.isEmpty(this.state.errors)) {

				let propsToSend = this.state.product;
				propsToSend.productId = this.state.product._id; //need to fix this, probably check router.js


        if (this.state.isEditForm) {
          let jsonProps = JSON.stringify(propsToSend);
          this.props.editExistingProduct(jsonProps).then(() => {
  					this.context.router.push('/inventory');
  				});

        } else {

          propsToSend.owner = this.props.activeUser._id; //Adds owner property to this props based on active user from redux state
      		let jsonProps = JSON.stringify(propsToSend); //converts properties into json before sending them to the server
      		this.props.createProduct(jsonProps).then(() => { //call action creator to submit the new product
      			this.context.router.push('/inventory'); //upon success return to the inventory
      		});

        }


			} else {
				return;
			}
		});

	}

	renderField(fieldConfig, field) {

		//This will return the fields for editing a product's information
		//the value of each field will be set according to singleProduct in global state
		//the singleProduct's information is accessible and changeable in local state

		return (
			<div key={field} className="col-lg-6 col-md-6">
				<fieldset id="manageProductFields" className="form-group">
					<label>{fieldConfig.label}</label>
					<fieldConfig.type name={field} className="form-control" type="text" value={this.state.product[field]} onChange={this.handleFieldEdit} />
					<div className="text-help">
						{this.state.errors[field] ? this.state.errors[field] : ''}
					</div>
				</fieldset>
			</div>

		);

	}

	render() {

			return (
				<div className="container marginTop" id="manageProductForm">
					<div className="row">

						<div id="manageBackArrow" className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
							<BackArrowBtn route={`/inventory`} />
						</div>
						<div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 text-center">
							<h3>{this.state.isEditForm ? 'Edit Product Info' : 'Create New Product'}</h3>
						</div>

				    <form onSubmit={this.handleSubmit}>
				      {_.map(FIELDS, this.renderField)}
							<div className="col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3">
								<button id="saveProductBtn" type="submit" className="btn btn-primary">Save Product</button>
							</div>
							<div className="col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3">
								<Link to="/allProducts" id="cancelProductBtn" className="btn btn-danger">Cancel</Link>
							</div>
				    </form>
						{this.state.isEditForm ?
							<div className="col-lg-4 col-md-4 col-lg-offset-4 col-md-offset-4 text-center">
	              <DeleteBtn
	                id="deleteProductBtn"
	                handleDelete={this.handleDeleteProduct}
	                itemIdToDelete={this.props.singleProduct._id} />
							</div> :
							<noscript />
						}

					</div>
				</div>
			);
	}
}

function mapStateToProps(state) {
	return { singleProduct: state.products.singleProduct, activeUser: state.user.activeUser };
}

export default connect(mapStateToProps, { createProduct, fetchSingleProduct, editExistingProduct, deleteExistingProduct })(ManageProductForm);
