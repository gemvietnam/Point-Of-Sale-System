import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBarContainer from 'NavBarContainer';
import PostAuthSideNavbar from 'PostAuthSideNavbar';

export default class App extends Component {
  render() {
    const { userAuthed } = this.props;
    return (
      <div id="appMain">
        <NavBarContainer />
        {userAuthed ? <PostAuthSideNavbar /> : null}
        <div className={userAuthed ? "body-content" : ''}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userAuthed: state.user.authenticated };
}

export default connect(mapStateToProps, null)(App);
