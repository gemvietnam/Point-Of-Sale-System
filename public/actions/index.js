import axios from 'axios';

export const CREATE_USER = 'CREATE_USER';
export const REQUEST_RESET_TOKEN = 'REQUEST_RESET_TOKEN';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const ADD_NEW_EMPLOYEE = 'ADD_NEW_EMPLOYEE';
export const EDIT_EXISTING_EMPLOYEE = 'EDIT_EXISTING_EMPLOYEE';
export const FETCH_ALL_EMPLOYEES = 'FETCH_ALL_EMPLOYEES';
export const FETCH_SINGLE_EMPLOYEE = 'FETCH_SINGLE_EMPLOYEE';
export const LOGIN_EMPLOYEE = 'LOGIN_EMPLOYEE';
export const LOGOUT_ACTIVE_EMPLOYEE = 'LOGOUT_ACTIVE_EMPLOYEE';
export const LOAD_EMPLOYEE_TODAY_REVENUE = 'LOAD_EMPLOYEE_TODAY_REVENUE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const LOGIN_USER = 'LOGIN_USER';
export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const FETCH_ALL_PRODUCTS = 'FETCH_ALL_PRODUCTS';
export const SEARCH_ALL_PRODUCTS = 'SEARCH_ALL_PRODUCTS';
export const SEARCH_HERBALS = 'SEARCH_HERBALS';
export const SEARCH_PHARMA = 'SEARCH_PHARMA';
export const SEARCH_CONSUMER = 'SEARCH_CONSUMER';
export const SEARCH_OTC = 'SEARCH_OTC';
export const FETCH_SINGLE = 'FETCH_SINGLE';
export const FETCH_SINGLE_SALE = 'FETCH_SINGLE_SALE';
export const FETCH_SALES = 'FETCH_SALES';
export const FETCH_SALES_BY_DATE = 'FETCH_SALES_BY_DATE';
export const ADD_TO_CART = 'ADD_TO_CART';
export const CALCULATE_CART_TOTALS = 'CALCULATE_CART_TOTALS';
export const MAKE_SALE = 'MAKE_SALE';
export const UNDO_SALE = 'UNDO_SALE';
export const HIDE_RECEIPT = 'HIDE_RECEIPT';
export const CLEAR_CART = 'CLEAR_CART';
export const DECREMENT_PRODUCT_IN_CART = 'DECREMENT_PRODUCT_IN_CART';
export const CLEAR_PRODUCT_IN_CART= 'CLEAR_PRODUCT_IN_CART';
export const FETCH_USER = 'FETCH_USER';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const DELETE_EXISTING_PRODUCT = 'DELETE_EXISTING_PRODUCT';
export const CALCULATE_TODAYS_REVENUE = 'CALCULATE_TODAYS_REVENUE';
export const CALCULATE_REVENUE_FOR_DAYS_THIS_WEEK = 'CALCULATE_REVENUE_FOR_DAYS_THIS_WEEK';
export const CALCULATE_EVERY_MONTHS_REVENUE = 'CALCULATE_EVERY_MONTHS_REVENUE';
export const LOAD_TODAYS_TOP_ITEMS = 'LOAD_TODAYS_TOP_ITEMS';
export const LOAD_WEEKS_TOP_ITEMS = 'LOAD_WEEKS_TOP_ITEMS';
export const LOAD_MONTHS_TOP_ITEMS = 'LOAD_MONTHS_TOP_ITEMS';
export const SET_CART_TAX = 'SET_CART_TAX';
export const CHANGE_CATEGORY_FILTER = 'CHANGE_CATEGORY_FILTER';

export function loginEmployee(props) {

	const request = axios.post(`/loginEmployee`, props);

	return {
		type: LOGIN_EMPLOYEE,
		payload: request
	};

}

export function createUser(props) {

	const request = axios.post(`/signup`, props);

	return request.then((response) => {

		var token = response.data.token;
		localStorage.setItem('token', token);
		//The user's token is taken from the reponse and set in local storage as 'token'
		//localstorage is only in the user's individual web browser, but it does not get cleared when a user hits refresh in the browser
		//Localstorage is not shared accross domains, so another website will not have access to the localstorage that's set in google.com

		return {
			type: CREATE_USER,
			payload: request
		};

	}, (response) => {
		throw new Error(response);
	});

}

export function resetPassword(props, token) {

	const jsonProps = JSON.stringify(props);

	const request = axios.post(`/resetPassword/${token}`, jsonProps);

	return {
		type: RESET_PASSWORD,
		payload: request
	};

}

export function forgotPassword(props) {

	const jsonProps = JSON.stringify(props);

	const request = axios.post(`/forgotPassword`, jsonProps);

	return {
		type: REQUEST_RESET_TOKEN,
		payload: request
	};
}

export function fetchAllEmployees(userId) {

	const config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.get(`/fetchAllEmployees/${userId}`, config);

	return {
		type: FETCH_ALL_EMPLOYEES,
		payload: request
	};

}


export function loadEmployeeTodayRevenue(employeeId) {

	const config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.get(`/employeeTodayRevenue/${employeeId}`, config);

	return {
		type: LOAD_EMPLOYEE_TODAY_REVENUE,
		payload: request
	};

}

export function deleteEmployee(employeeId) {

	const config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.delete(`/deleteEmployee/${employeeId}`, config);

	return {
		type: DELETE_EMPLOYEE,
		payload: request
	};
	
}


export function addNewEmployee(employee) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.post('/addNewEmployee', employee, config);

	return {
		type: ADD_NEW_EMPLOYEE,
		payload: request
	};

}

export function editExistingEmployee(employee) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.put('/editExistingEmployee', employee, config);

	return {
		type: EDIT_EXISTING_EMPLOYEE,
		payload: request
	};

}

// returns a single employee from database based on employee's id
export function fetchSingleEmployee(employeeId) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.get(`/fetchSingleEmployee/${employeeId}`, config);

	return {
		type: FETCH_SINGLE_EMPLOYEE,
		payload: request
	};

}

export function logOutActiveEmployee() {
	return {
		type: LOGOUT_ACTIVE_EMPLOYEE
	};
}

export function loginUser(props) {

	// should I convert the props to JSON before sending?
	const request = axios.post(`/login`, props);

	return request.then((response) => {

		var token = response.data.token;
		localStorage.setItem('token', token); //The user's token is taken from the reponse and set in local storage as 'token'

		return {
			type: LOGIN_USER,
			payload: request
		};

	}, (response) => {
		throw new Error(response);
	});

}

//fetchUser will return the user based on the jwt that is currently stored in localStorage
export function fetchUser() {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.get('/fetchUser', config);

	return request.then((response) => {

		return {
			type: FETCH_USER,
			payload: request
		}
	});
}

export function signoutUser() {

	localStorage.removeItem('token'); //destroys the user's JWT stored in local storage

	return {
		type: UNAUTH_USER
	};
}

export function authError(error) {
	//this will send along an error message to the auth reducer
	//define the message as a parameter (string)
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function fetchProducts() {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.get(`/fetchAllProducts`, config); //'token' is passed along in the request via config object

	return {
		type: FETCH_ALL_PRODUCTS,
		payload: request
	};

}

export function createProduct(props) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.post('/createProduct', props, config);

	return {
		type: CREATE_PRODUCT,
		payload: request
	};

}

export function editExistingProduct(props) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.put('/editProduct', props, config);

	return {
		type: EDIT_PRODUCT,
		payload: request
	};

}

export function deleteExistingProduct(productId) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.delete(`/deleteProduct/${productId}`, config);

	return {
		type: DELETE_EXISTING_PRODUCT,
		payload: request
	};

}

export function searchProducts(queryParams) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.get(`/fetchAllProducts?q=${queryParams}`, config);

	return {
		type: SEARCH_ALL_PRODUCTS,
		payload: request
	};

}

// export function fetchHerbals() {
//
// 	var config = {headers: {'authorization' : localStorage.getItem('token')}};
//
// 	//mlab configuration
// 	// const herbalsID = '57120d5b66462f28037c853f';
// 	// const request = axios.get(`/products/57120d5b66462f28037c853f`, config); //'token' is passed along in the request via config object
//
// 	//local database configuration
// 	// const herbalsID = '572a5fa37a9caf990e3303ae';
// 	const request = axios.get(`/products/herbal`, config);
//
// 	return {
// 		type: FETCH_HERBALS,
// 		payload: request
// 	};
// }

export function searchHerbals(queryParams) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	//mlab configuration
	// const herbalsID = '57120d5b66462f28037c853f';
	// const request = axios.get(`/products/57120d5b66462f28037c853f?q=${queryParams}`, config);

	//local database configuration
	// const herbalsID = '572a5fa37a9caf990e3303ae';
	const request = axios.get(`/products/herbal?q=${queryParams}`, config);

	return {
		type: SEARCH_HERBALS,
		payload: request
	};

}

// export function fetchPharma() {
//
// 	var config = {headers: {'authorization' : localStorage.getItem('token')}};
//
// 	//mlab configuration
// 	// const pharmaID = '571201a269017ed102820e67';
// 	// const request = axios.get(`/products/571201a269017ed102820e67`, config); //'token' is passed along in the request via config object
//
// 	//local database configuration
// 	// const pharmaID = '572a5faf7a9caf990e3303af';
// 	const request = axios.get(`/products/pharmaceutical`, config);
//
// 	return {
// 		type: FETCH_PHARMA,
// 		payload: request
// 	};
//
// }

export function searchPharma(queryParams) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	//mlab configuration
	// const pharmaID = '571201a269017ed102820e67';
	// const request = axios.get(`/products/571201a269017ed102820e67?q=${queryParams}`, config);

	//local database configuration
	// const pharmaID = '572a5faf7a9caf990e3303af';
	const request = axios.get(`/products/pharmaceutical?q=${queryParams}`, config);

	return {
		type: SEARCH_PHARMA,
		payload: request
	};

}

export function searchConsumer(queryParams) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.get(`/products/consumer?q=${queryParams}`, config);

	return {
		type: SEARCH_CONSUMER,
		payload: request
	};

}

export function searchOTC(queryParams) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.get(`/products/OTC?q=${queryParams}`, config);

	return {
		type: SEARCH_OTC,
		payload: request
	};

}

export function fetchSingleProduct(productID) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	var request = axios.get(`/fetchSingleProduct/${productID}`, config);

	return {
		type: FETCH_SINGLE,
		payload: request
	};

}

export function fetchSingleSale(saleId) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	var request = axios.get(`/fetchSale/${saleId}`, config);

	return {
		type: FETCH_SINGLE_SALE,
		payload: request
	};

}

export function fetchSales(userId) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	var request = axios.get(`/fetchSales/${userId}`, config);

	return {
		type: FETCH_SALES,
		payload: request
	};

}

export function fetchSalesByDate(userId, startDate, endDate) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	var request = axios.get(`/fetchSalesByDate/${userId}/${startDate}/${endDate}`, config);

	return {
		type: FETCH_SALES_BY_DATE,
		payload: request
	};

}

export function addToCart(product) {

	return {
		type: ADD_TO_CART,
		payload: product
	};

}

export function calculateCartTotals() {
	return {
		type: CALCULATE_CART_TOTALS
	};
}

export function undoSale(saleId) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	var request = axios.delete(`/undoSale/${saleId}`, config);

	return {
		type: UNDO_SALE,
		payload: request
	};

}

export function makeSale(props) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	var request = axios.post('/makeSale', props, config); //This will store the sale in the database and also return it

	return {
		type: MAKE_SALE,
		payload: request //Sends sale along to be used in sale_reducer.js
	};

}

export function decrementProductInCart(product) {

	return {
		type: DECREMENT_PRODUCT_IN_CART,
		payload: product
	};

}

// completely removes 1 product from the cart regardless of cart quantity
export function clearProductInCart(product) {

	return {
		type: CLEAR_PRODUCT_IN_CART,
		payload: product
	};

}

export function hideReceipt() {
	return {
		type: HIDE_RECEIPT
	};
}

export function clearCart() {
	return {
		type: CLEAR_CART
	};
}

//this will load today's top selling items and send it to the item_reporting_reducer
export function loadTodaysTopItems(userId) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.get(`/loadTodaysTopItems/${userId}`, config);

	return {
		type: LOAD_TODAYS_TOP_ITEMS,
		payload: request
	};

}

//this will load this week's top selling items and send it to the item_reporting_reducer
export function loadWeeksTopItems(userId) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.get(`/loadWeeksTopItems/${userId}`, config);

	return {
		type: LOAD_WEEKS_TOP_ITEMS,
		payload: request
	};

}

//this will load this month's top selling items and send it to the item_reporting_reducer
export function loadMonthsTopItems(userId) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.get(`/loadMonthsTopItems/${userId}`, config);

	return {
		type: LOAD_MONTHS_TOP_ITEMS,
		payload: request
	};

}

export function setCartTax(tax) {

	return {
		type: SET_CART_TAX,
		payload: tax
	};

}

export function calculateTodaysRevenue(userId) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.get(`/loadTodaysRevenue/${userId}`, config);

	return {
		type: CALCULATE_TODAYS_REVENUE,
		payload: request
	};

}

export function calculateEveryMonthsRevenue(userId) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.get(`/loadEveryMonthsRevenue/${userId}`, config);

	return {
		type: CALCULATE_EVERY_MONTHS_REVENUE,
		payload: request
	};

}

export function calculateRevenueForDaysThisWeek(userId) {

	var config = {headers: {'authorization' : localStorage.getItem('token')}};

	const request = axios.get(`/loadThisWeeksRevenue/${userId}`, config);

	return {
		type: CALCULATE_REVENUE_FOR_DAYS_THIS_WEEK,
		payload: request
	};

}

export function changeCategoryFilter(category) {

	return {
		type: CHANGE_CATEGORY_FILTER,
		payload: category
	};

}
