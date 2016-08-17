import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reducers from './reducers';
import routes from './routes';
import promise from 'redux-promise';
import { AUTH_USER } from './actions/index';
import { fetchUser } from './actions/index';
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
export const store = createStoreWithMiddleware(reducers, compose(window.devToolsExtension ? window.devToolsExtension() : f => f ));


const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER }); //the dispatch method is located on store also
  store.dispatch(fetchUser()); //loads user information since the auth token exists already
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.masterContainer'));
