import React, {Component} from 'react';
import {connect} from 'react-redux';

export default function(ComposedComponent) { //This code right here serves as the base for any high order component 

	class Authentication extends Component {

		static contextTypes = { //static creates a class level object that will give any other method in this component access to Authentication.contextTypes
			router: React.PropTypes.object //This lets react know ahead of time we will use the router and it defines its type as object
		}

		componentWillMount() {
			if (!this.props.authenticated) {
				this.context.router.push('/signup');
			}
			
		}

		componentWillUpdate(nextProps) {
		 //this lifecycle method runs when the component is about to update with new props, nextProps are those new properties for the rerender
			if (!nextProps.authenticated) {
				this.context.router.push('/signup');
			}
		}

		//{...this.props} makes sure the new combined component Enhanced Component will have all the props of the original component passed into this function/Authentication class
		//it maintains those props even though it's combining two components together to form a Enhanced Component
		render() {
			
			return (
				<ComposedComponent {...this.props} />
			);
		}

	}

	function mapStateToProps(state) {
		return { authenticated: state.user.authenticated };
	}

	return connect(mapStateToProps)(Authentication);
}