import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import our instance of redux store from index.jsx
import { store } from '../../index.jsx';
import { Provider } from 'react-redux';

class Modal extends Component {

  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = 'modal';
    document.body.appendChild(this.modalTarget);
    this._render();
  }

  componentWillUpdate() {
    // If a new set of children are passed to Modal
    // it will rerender
    this._render();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  _render() {
    // If a container component is passed into Modal as a child, it will still
    // have access to the redux store via Provider even though Modal is not a
    // child of this application's root component (App.jsx)
    ReactDOM.render(
      <Provider store={store} >
        <div>{this.props.children}</div>
      </Provider>,
      this.modalTarget
    );
  }

  render() {
    return (
      <noscript />
    );
  }

}

export default Modal;
