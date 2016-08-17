import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actions from 'Actions';

class Signout extends Component {

	componentWillMount() {
		// Signs out user as soon as they hit this route
		// This strategy allows the use of a message to show the user before they leave
		this.props.signoutUser();
	}

	componentWillReceiveProps(nextProps) {
		// if the user logs in from this page, push onward to '/inventory'
		if (nextProps.authenticated) {
				browserHistory.push('/inventory');
		}
	}

	render() {
		return (
			<div className="container">
			   <div className="row">
					 <div className="col-lg-4 col-md-4 col-lg-offset-4 col-md-offset-4">
						 <img id="signoutBacsiLogo" className="img-responsive" src="../images/hello_bacsi_logo.png"/>
						 <p>Add Signout Content, Marketing Meesage Etc, Say farewell to User</p>
					 </div>
			   </div>
			</div>
		);
	}

}

function mapStateToProps(state) {
	return { authenticated: state.user.authenticated };
}

export default connect(mapStateToProps, actions)(Signout);
