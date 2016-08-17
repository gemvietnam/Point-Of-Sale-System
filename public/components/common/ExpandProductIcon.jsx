import React, {PropTypes} from 'react';
import { Link } from 'react-router';

const ExpandProductIcon = ({ route }) => {
  return (
    <Link to={route}><i id="expandProductIcon"
       className="fa fa-arrows-alt"
       aria-hidden="true"></i></Link>
  );
};

ExpandProductIcon.propTypes = {
  route: PropTypes.string
};

export default ExpandProductIcon;
