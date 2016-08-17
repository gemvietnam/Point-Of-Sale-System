import { CREATE_USER, LOGIN_USER, AUTH_ERROR, AUTH_USER, FETCH_USER, UNAUTH_USER } from '../actions/index';


const INITIAL_STATE = { activeUser: null, authenticated: false, errorMessage: ""};

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {

		case CREATE_USER:
		  // The newly signed up and logged in user's info is set to global state under activeUser
			return { ...state, activeUser: action.payload.data.user, authenticated: true };

		case LOGIN_USER:
		  // The newly logged in user's info is set to global state under activeUser
			return { ...state, activeUser: action.payload.data.user, authenticated: true };

		case AUTH_ERROR:
			return { ...state, errorMessage: action.payload };

		case AUTH_USER:
			return { ...state, authenticated: true };

		case UNAUTH_USER:
			return { ...state, authenticated: false, activeUser: null };

		case FETCH_USER:
			return {...state, activeUser: action.payload.data }

		default:
			return state;

	}
}
