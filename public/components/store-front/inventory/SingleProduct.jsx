import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import { addToCart, calculateCartTotals } from 'Actions';
import SingleProductSymbol from 'SingleProductSymbol';
import _ from 'underscore';

class SingleProduct extends Component {

	constructor(props) {
		super(props);
		this.handleAddProduct = this.handleAddProduct.bind(this);
	}

	handleAddProduct() {
		this.props.addToCart(this.props.product);
		this.props.calculateCartTotals();
	}

	render() {
		const { product, showReceipt } = this.props;

		return (
			<div id="singleProduct" className="wow flipInY">
				<div className="row">

					<div id="examineIcon" className="col-lg-12 col-md-12">
						<Link to={`/productProfile/${product._id}`}><i className="fa fa-arrows-alt"></i></Link>
					</div>
					{/* May want to turn product's symbol into a component that returns its value
						based on product.category */}
					<div id="pricetag" className="text-center col-lg-12 col-md-12">
						<SingleProductSymbol
							productCategory={product.category}
							handleAddProduct={this.handleAddProduct}
							showReceipt={showReceipt} />
					</div>

					<div className="col-lg-12 col-md-12">
						<p id="productName" className="bold">{product.name}</p>
					</div>

				</div>
			</div>
		);
	}

}

function mapStateToProps(state) {
	return { cart: state.cart.currentCart,
					 showReceipt: state.sale.showReceipt,
					 activeUser: state.user.activeUser };
}


export default connect(mapStateToProps, { addToCart, calculateCartTotals })(SingleProduct);
