import {
	CALCULATE_TODAYS_REVENUE,
	CALCULATE_EVERY_MONTHS_REVENUE,
	CALCULATE_REVENUE_FOR_DAYS_THIS_WEEK } from 'Actions';

const INITIAL_STATE = {
	todaysTotalRevenue: 0,
	thisWeeksTotalRevenue: 0,
	thisMonthsTotalRevenue: 0,
	revenueForDaysThisWeek: [],
	everyMonthsRevenue: []
};

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {

		case CALCULATE_TODAYS_REVENUE:

      return { ...state, todaysTotalRevenue: action.payload.data.todaysTotalRevenue };

		case CALCULATE_REVENUE_FOR_DAYS_THIS_WEEK:

			let thisWeeksTotalRevenue = 0;

			action.payload.data.forEach(dayOfWeek => {
				//dayOfWeek = [dateString, daysTotalRevenue]
				thisWeeksTotalRevenue += dayOfWeek[1];
			});

			return { ...state, thisWeeksTotalRevenue, revenueForDaysThisWeek: action.payload.data };

		case CALCULATE_EVERY_MONTHS_REVENUE:

			//pull out the total revenue for the current month
			let currentDate = new Date();
			let currentMonth = currentDate.getMonth();
			let thisMonthsTotalRevenue = action.payload.data[currentMonth][1];

			return { ...state, thisMonthsTotalRevenue, everyMonthsRevenue: action.payload.data };

		default:
			return state;

	}

}
