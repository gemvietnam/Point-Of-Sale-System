import React, { Component, PropTypes } from 'react';
import {Link, IndexLink} from 'react-router';
import { connect } from 'react-redux';
import Navbar from './Navbar.jsx';
import { loginUser } from 'Actions';

class NavBarContainer extends Component {

	render() {

    const { activeUser, activeEmployee } = this.props;

    if (activeUser) {
      return <Navbar activeUser={activeUser} activeEmployee={activeEmployee} />;
    } else {
      return <Navbar />;
    }
	}

}

function mapStateToProps(state, ownProps) {
  return {
    activeUser: state.user.activeUser,
		activeEmployee: state.employees.activeEmployee
  };
}

export default connect(mapStateToProps, { loginUser })(NavBarContainer);
