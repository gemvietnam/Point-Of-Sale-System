import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'App';

import LandingPage from 'LandingPage';
import Signup from 'Signup';
import StoreFrontContainer from 'StoreFrontContainer';
import ProductProfile from 'ProductProfile';
import SaleDetailsContainer from 'SaleDetailsContainer';
import UserDashboardContainer from 'UserDashboardContainer';
import EmployeeProfileContainer from 'EmployeeProfileContainer';
import EditEmployeeForm from 'EditEmployeeForm';
import RequireAuth from 'RequireAuth';
import Signout from 'Signout';
import AllProducts from 'AllProducts';
import SalesHistoryContainer from 'SalesHistoryContainer';
import ReportingContainer from 'ReportingContainer';
import ManageProductForm from 'ManageProductForm';
import RequestReset from 'RequestReset';
import ForgotPassword from 'ForgotPassword';

//wrapping any of these components with RequireAuth() will check for state.auth.authenticated being true before allowing access to the route
//The Welcome component will render when sitting on the "/" home route

export default (
	<Route path="/" component={App}>

		<IndexRoute component={LandingPage} />

		<Route path="inventory" component={RequireAuth(StoreFrontContainer)} />
		<Route path="signup" component={Signup} />
		<Route path="productProfile/:id" component={RequireAuth(ProductProfile)} />
		<Route path="userProfile/:userId" component={RequireAuth(UserDashboardContainer)} />
		<Route path="employeeProfile/:employeeId" component={RequireAuth(EmployeeProfileContainer)} />
		<Route path="editEmployee/:employeeId" component={RequireAuth(EditEmployeeForm)} />
		<Route path="saleDetails/:id" component={RequireAuth(SaleDetailsContainer)} />
		<Route path="allProducts" component={RequireAuth(AllProducts)} />
		<Route path="salesHistory" component={RequireAuth(SalesHistoryContainer)} />
		<Route path="manageProduct" component={RequireAuth(ManageProductForm)} />
		<Route path="manageProduct/:productId" component={RequireAuth(ManageProductForm)} />
		<Route path="reporting" component={RequireAuth(ReportingContainer)} />
		<Route path="requestReset" component={RequestReset} />
		<Route path="forgot/:token" component={ForgotPassword} />
		<Route path="signout" component={Signout} />
	</Route>
);
