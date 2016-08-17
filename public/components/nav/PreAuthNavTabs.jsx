import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import LoginFormContainer from 'LoginFormContainer';

const PreAuthNavTabs = () => {
  return (
    <div id="preAuthNavTabs" className="navbar-collapse collapse">
      <ul className="nav navbar-nav navbar-left">
        <li><Link to="#about">About</Link></li>
        <li><Link to="#features">Features</Link></li>
        <li><Link to="#press">Press</Link></li>
        <li><Link to="#screenshots">Screens</Link></li>
        <li><Link to="#reviews">Reviews</Link></li>
  		  <li><Link to="#contact">Contact</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
      <LoginFormContainer />
    </div>
  );
};

export default PreAuthNavTabs;
