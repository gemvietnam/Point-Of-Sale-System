import React, { Component } from 'react';
import { connect } from 'react-redux';

import { makeSale, addToCart, decrementProductInCart,
         calculateCartTotals, hideReceipt, clearCart,
         undoSale, clearProductInCart } from 'Actions';

import CartHeader from 'CartHeader';
import CartProductsTable from 'CartProductsTable';
import CartTotalsTable from 'CartTotalsTable';
import UndoSaleBtn from 'UndoSaleBtn';
import ClearCartBtn from 'ClearCartBtn';

class CartContainer extends Component {
  constructor(props) {
    super(props);
    this.handlePay = this.handlePay.bind(this);
    this.hideReceipt = this.hideReceipt.bind(this);
    this.handlePlusBtn = this.handlePlusBtn.bind(this);
    this.handleMinusBtn = this.handleMinusBtn.bind(this);
  }

  handlePlusBtn(product) {
		this.props.addToCart(product);
		this.props.calculateCartTotals();
	}

  handleMinusBtn(product) {
    this.props.decrementProductInCart(product);
    this.props.calculateCartTotals();
  }

  handlePay() {

		const saleProps = {
			user_id: this.props.activeUser._id, //This sale will belong to the user that is logged in (global state)
      activeEmployeeId: this.props.activeEmployee._id,
			items: [], //All the items in the cart will be added to the sale
			total: this.props.cartTotal //Total price of the sale is drawn from the global state
		};


		this.props.cart.map(product => {
			var item = {};
			item.name = product.name;
			item.product_id = product._id;
      item.category = product.category;
			item.cartQuantity = product.cartQuantity;
			item.priceValue = product.price;
			saleProps.items.push(item);
		});

		var jsonSaleProps = JSON.stringify(saleProps); //converts properties into json before sending them to the server

    //call the action creator makeSale to send formatted data to router.js
		this.props.makeSale(jsonSaleProps);

	}

  hideReceipt() {
		this.props.clearCart(); //clears the global cart values
		this.props.hideReceipt(); //hides receipt by setting showReceipt to false which shows Checkout.jsx again
	}

  renderCheckoutBtns() {
    if (this.props.showReceipt) {
      return (
        <button onClick={this.hideReceipt} type="button" className="btn btn-success checkOutBtn">
          <i id="hideReceiptIcon"
           className="fa fa-check-square-o fa-4x"
           aria-hidden="true"></i>
        </button>

      );
    } else {
      return <button onClick={this.handlePay} className="btn btn-success checkOutBtn">Pay</button>;
    }
  }

  render() {
    const { cart,
            addToCart,
            decrementProductInCart,
            clearProductInCart,
            calculateCartTotals,
            cartSubtotal,
            tax,
            cartTotal,
            showReceipt,
            lastSale,
            undoSale,
            hideReceipt,
            clearCart
          } = this.props;

      return (
				<div className="checkout">
					<div className="row">
						<div className="col-lg-12 col-md-12">
							<div id="checkoutPanel" className="panel panel-default">
							  <div className="panel-heading">
                  <div className="row">
                    <div className="col-lg-4 col-md-4">

                      {showReceipt ?
                        <UndoSaleBtn hideReceipt={hideReceipt} lastSale={lastSale} handleUndoSale={undoSale} /> :
                        <ClearCartBtn handleClearCart={clearCart} /> }

                    </div>
                    <div className="col-lg-4 col-md-4">
                      <CartHeader cart={cart} showReceipt={showReceipt} />
                    </div>
                  </div>
							  </div>
							  <div className="cartTableContainer">

								  <CartProductsTable
                    cart={cart}
                    decrementProductInCart={decrementProductInCart}
                    clearProductInCart={clearProductInCart}
                    calculateCartTotals={calculateCartTotals}
                    showReceipt={showReceipt}
                    handlePlusBtn={this.handlePlusBtn}
                    handleMinusBtn={this.handleMinusBtn}
                  />

							  </div>
							  <div className="panel-footer">

  							  <CartTotalsTable
                    cartSubtotal={cartSubtotal}
                    tax={tax}
                    cartTotal={cartTotal}
                  />
                  {this.renderCheckoutBtns()}
							  </div>
							</div>
						</div>
					</div>
				</div>
			);
    // }
  }
}

function mapStateToProps(state) {

	return {
		cart: state.cart.currentCart,
		cartTotal: state.cart.cartTotal,
		cartSubtotal: state.cart.cartSubtotal,
		activeUser: state.user.activeUser,
    activeEmployee: state.employees.activeEmployee,
		showReceipt: state.sale.showReceipt,
		tax: state.cart.tax,
    lastSale: state.sale.lastSale
	};

}

export default connect(mapStateToProps,
  { makeSale,
    addToCart,
    decrementProductInCart,
    calculateCartTotals,
    hideReceipt,
    undoSale,
    clearCart,
    clearProductInCart })(CartContainer);
