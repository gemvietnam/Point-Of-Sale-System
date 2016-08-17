import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchSingleSale } from 'Actions';
import SaleProfile from 'SaleProfile';

class SaleDetailsContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    // fetches a single sale from the db based on sale id located in url params
    this.props.fetchSingleSale(this.props.params.id);
  }
  render() {
    return (
      <div className="container">
        <SaleProfile sale={this.props.singleSale} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { singleSale: state.sale.singleSale };
}

export default connect(mapStateToProps, { fetchSingleSale })(SaleDetailsContainer);
