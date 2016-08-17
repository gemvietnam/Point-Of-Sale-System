import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ProductsReducer from './products_reducer';
import UserReducer from './user_reducer';
import CartReducer from './cart_reducer';
import SaleReducer from './sale_reducer';
import ItemReportingReducer from './item_reporting_reducer';
import RevenueReportingReducer from './revenue_reporting_reducer';
import CategoriesReducer from './categories_reducer';
import EmployeesReducer from './employees_reducer';

const rootReducer = combineReducers({
  user: UserReducer,
  products: ProductsReducer,
  cart: CartReducer,
  sale: SaleReducer,
  itemReporting: ItemReportingReducer,
  revenueReporting: RevenueReportingReducer,
  categories: CategoriesReducer,
  employees: EmployeesReducer,
  form: formReducer
});

export default rootReducer;
