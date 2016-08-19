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
        <div className="row">
          <div className="col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3">
            <button id="deleteSaleBtn" className="btn btn-danger">Delete Sale</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { singleSale: state.sale.singleSale };
}

export default connect(mapStateToProps, { fetchSingleSale })(SaleDetailsContainer);
