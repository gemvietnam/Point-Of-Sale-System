import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { fetchSingleSale, undoSale } from 'Actions';
import SaleProfile from 'SaleProfile';
import toastr from 'toastr';

class SaleDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteSale = this.handleDeleteSale.bind(this);
  }
  componentWillMount() {
    // fetches a single sale from the db based on sale id located in url params
    this.props.fetchSingleSale(this.props.params.id);
  }
  handleDeleteSale() {
    this.props.undoSale(this.props.singleSale._id).then(() => {
      browserHistory.push('/salesHistory');
      toastr.success("Sale deleted");
    });
  }
  render() {
    return (
      <div className="container">
        <SaleProfile sale={this.props.singleSale} />
        <div className="row">
          <div className="col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3">
            <button
              id="deleteSaleBtn"
              className="btn btn-danger"
              onClick={this.handleDeleteSale}>Delete Sale</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { singleSale: state.sale.singleSale };
}

export default connect(mapStateToProps, { fetchSingleSale, undoSale })(SaleDetailsContainer);
