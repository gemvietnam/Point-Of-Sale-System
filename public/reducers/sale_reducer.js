import { browserHistory } from 'react-router';
import { MAKE_SALE, HIDE_RECEIPT, FETCH_SALES, FETCH_SINGLE_SALE,
				 CALCULATE_TODAYS_REVENUE, UNDO_SALE, FETCH_SALES_BY_DATE } from '../actions/index';


const INITIAL_STATE = { lastSale: {}, allSales:[],
												singleSale: {}, todaysSales:[],
											  showReceipt: false };

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {

		case MAKE_SALE:
			//every new sale will also be added to allSales
			return { lastSale: action.payload.data, allSales: [...state.allSales, action.payload.data], showReceipt: true };

		case FETCH_SALES:
			// Order the sales from newest to oldest before storing the array in REDUX state
			const latestSales = action.payload.data.reverse();
			return { ...state, allSales: latestSales };

		case FETCH_SINGLE_SALE:
			return { ...state, singleSale: action.payload.data };

		case FETCH_SALES_BY_DATE:
		  // replaces allSales with results based on user's search query by date
			// in SalesSearchForm.jsx
			return { ...state, allSales: action.payload.data }

		case HIDE_RECEIPT:
			return { ...state, showReceipt: false };

		case CALCULATE_TODAYS_REVENUE:
			return { ...state, todaysSales: action.payload.data.todaysSales };

		case UNDO_SALE:
			return { ...state, lastSale: {} };

		default:
			return state;

	}
}
