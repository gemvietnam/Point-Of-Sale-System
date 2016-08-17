import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';

const BackArrowBtn = ({ route }) => {
  return (
    <i id="backArrow"
       onClick={() => browserHistory.push(route)}
       className="fa fa-arrow-circle-o-left fa-4x"
       aria-hidden="true" ></i>
  );
};

BackArrowBtn.propTypes = {
  route: PropTypes.string.isRequired
};

export default BackArrowBtn;
