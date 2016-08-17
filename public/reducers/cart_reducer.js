import _ from 'underscore';
import { ADD_TO_CART, CALCULATE_CART_TOTALS, CLEAR_CART,
				 DECREMENT_PRODUCT_IN_CART, CLEAR_PRODUCT_IN_CART, SET_CART_TAX } from '../actions/index';


const INITIAL_STATE = { currentCart: [], cartTotal: 0, cartSubtotal: 0, tax: 0, discount: 0 };

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {

		case CALCULATE_CART_TOTALS:

			let newSubtotal = 0;
			let newTotal = 0;

			state.currentCart.forEach( product => {

				newSubtotal += (product.price * product.cartQuantity);
				newTotal += (product.price * product.cartQuantity);

			});

			return {...state, cartTotal: newTotal, cartSubtotal: newSubtotal };

		case ADD_TO_CART:

			let productToAdd = action.payload;

			//_.indexOf will return the position of the product in the cart if a duplicate is about to be added
			var exists  = _.findIndex(state.currentCart, {
				_id: productToAdd._id
			});

			//if exists is greater than or equal to 0, then the product exists in the currentCart array
			if (exists >= 0) {

				//increment the product's cartQuantity by 1
				state.currentCart[exists].cartQuantity++

				return state;

			} else {

				//gives the product a new key called cartQuantity and adds it to the currentCart in redux state
				productToAdd.cartQuantity = 1;

				return {...state, currentCart: [ ...state.currentCart, productToAdd ]};

			}

		case DECREMENT_PRODUCT_IN_CART:

			var productToDelete = action.payload;

			//Here we check to see if the item has a cartQuantity so it can be decremented by 1 instead of completely deleted
			//like in the else clause
			if (productToDelete.cartQuantity > 1) {

				var index = _.findIndex(state.currentCart, {
					    				_id: productToDelete._id
			         			});

				productToDelete.cartQuantity--;

				var updatedCart = state.currentCart;
				updatedCart[index].cartQuantity = productToDelete.cartQuantity;

				return {...state, currentCart: updatedCart};

			} else {

				//returns currentCart without a product. The product to delete is sent in action.payload
				return {...state, currentCart: _.without(state.currentCart, action.payload)};

			}

		case CLEAR_PRODUCT_IN_CART:
			// returns currentCart without a particular product regardless
			// of its cartQuantity
			return {...state, currentCart: _.without(state.currentCart, action.payload)};

		case CLEAR_CART:

			return {...state, currentCart: [], cartTotal: 0, cartSubtotal: 0};

		case SET_CART_TAX:
			//convert string to number for tax
			const tax = Number(action.payload);

			return {...state, tax };

		default:

			return state;

	}
}
