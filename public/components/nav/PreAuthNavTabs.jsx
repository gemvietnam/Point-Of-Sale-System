import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import LoginFormContainer from 'LoginFormContainer';

const PreAuthNavTabs = () => {
  return (
    <div id="preAuthNavTabs" className="navbar-collapse collapse">
      <ul className="nav navbar-nav navbar-left">
        <li><Link to="#features">Features</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/requestReset">Forgot Password</Link></li>
      </ul>
      <LoginFormContainer />
    </div>
  );
};

export default PreAuthNavTabs;
