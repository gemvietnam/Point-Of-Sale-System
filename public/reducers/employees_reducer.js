
import { FETCH_ALL_EMPLOYEES, FETCH_SINGLE_EMPLOYEE,
	       LOGOUT_ACTIVE_EMPLOYEE, LOAD_EMPLOYEE_TODAY_REVENUE,
				 EDIT_EXISTING_EMPLOYEE, LOGIN_EMPLOYEE,
			   DELETE_EMPLOYEE, EMPLOYEE_PASS_RESET } from 'Actions';

const INITIAL_STATE = { employees: [], singleEmployee: {},
												activeEmployee: {}, employeeToResetPass: {}, employeeTodaysRevenue: 0,
											 	numSalesToday: 0 };

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {

		case FETCH_ALL_EMPLOYEES:
			return { ...state, employees: action.payload.data };

		case FETCH_SINGLE_EMPLOYEE:
			return { ...state, singleEmployee: action.payload.data };

		case LOGIN_EMPLOYEE:
			// check for login error
			if (action.payload.status == 401) {
				return { ...state };
			}
			return { ...state, activeEmployee: action.payload.data };

		case LOGOUT_ACTIVE_EMPLOYEE:
			return { ...state, activeEmployee: {} };

		case LOAD_EMPLOYEE_TODAY_REVENUE:
			return { ...state, employeeTodaysRevenue: action.payload.data.todaysRevenue,
							numSalesToday: action.payload.data.numSales };

		case EDIT_EXISTING_EMPLOYEE:
			return { ...state, singleEmployee: action.payload.data };

		case DELETE_EMPLOYEE:
			return { ...state, singleEmployee: {} };

		case EMPLOYEE_PASS_RESET:
			return { ...state, employeeToResetPass: action.payload.data };

		default:
			return state;

	}

}
