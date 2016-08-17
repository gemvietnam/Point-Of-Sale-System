import { FETCH_ALL_PRODUCTS, SEARCH_ALL_PRODUCTS, SEARCH_HERBALS,
				 SEARCH_PHARMA, SEARCH_CONSUMER, SEARCH_OTC, FETCH_SINGLE } from '../actions/index';


const INITIAL_STATE = { all: [], pharma: [], herbals: [],
												consumer: [], OTC: [], singleProduct: {} };

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {

		case FETCH_ALL_PRODUCTS:

			let pharma = action.payload.data.filter(product => {
				return product.category === 'pharmaceutical';
			});

			let herbals = action.payload.data.filter(product => {
				return product.category === 'herbal';
			});

			let consumer = action.payload.data.filter(product => {
				return product.category === 'consumer';
			});

			let OTC = action.payload.data.filter(product => {
				return product.category === 'OTC';
			});

			return { ...state, all: action.payload.data, pharma, herbals, consumer, OTC };

		case SEARCH_ALL_PRODUCTS:
			return { ...state, all: action.payload.data };

		case SEARCH_HERBALS:
			return { ...state, herbals: action.payload.data };

		case SEARCH_PHARMA:
			return { ...state, pharma: action.payload.data };

		case SEARCH_CONSUMER:
			return { ...state, consumer: action.payload.data };

		case SEARCH_OTC:
			return { ...state, OTC: action.payload.data };

		case FETCH_SINGLE:
			return {...state, singleProduct: action.payload.data };

		default:
			return state;

	}
}
