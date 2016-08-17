import { LOAD_TODAYS_TOP_ITEMS, LOAD_WEEKS_TOP_ITEMS, LOAD_MONTHS_TOP_ITEMS } from 'Actions';

const INITIAL_STATE = { todaysTopItems: [], weeksTopItems: [], monthsTopItems: [] };

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {

		case LOAD_TODAYS_TOP_ITEMS:
			return {...state, todaysTopItems: action.payload.data };

		case LOAD_WEEKS_TOP_ITEMS:
			return {...state, weeksTopItems: action.payload.data };

		case LOAD_MONTHS_TOP_ITEMS:
			return {...state, monthsTopItems: action.payload.data };

		default:
			return state;

	}

}
