import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchSales } from 'Actions';
import SalesHistoryTable from 'SalesHistoryTable';
import SalesSearchForm from 'SalesSearchForm';
import LoadingSpinner from 'LoadingSpinner';
import LoadProductsBtn from 'LoadProductsBtn';

class SalesHistoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numSalesShowing: 10
    };
    this.handleLoadSales = this.handleLoadSales.bind(this);
  }
  componentWillMount() {
    if (this.props.activeUser) {
      this.props.fetchSales(this.props.activeUser._id);
    } else {
      this.props.fetchUser().then(() => {
        this.props.fetchSales(this.props.activeUser._id);
      });
    }
  }
  handleLoadSales() {
    // The number of sales displayed on the screen, to be incremented by 20
    // per click
    const showMoreNum = this.state.numSalesShowing + 20;

    this.setState({
      numSalesShowing: showMoreNum
    });

  }
  render() {
    const { allSales } = this.props;
    return (
      <div id="salesHistoryContainer" className="container">
        <div className="row">
          <div className="col-lg-12">
            <p className="primaryGray" id="historyHead">
              Sales History
            </p>
            <p className="primaryGray" id="historySubHead">
              View your sales history during a certain period of time
            </p>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <SalesSearchForm />
                  </div>
                </div>
              </div>

              {allSales.length ? <SalesHistoryTable
                numSalesShowing={this.state.numSalesShowing}
                sales={allSales} /> :
                <LoadingSpinner />
              }



              <div id="allProductsFooter" className="panel-footer">

                <LoadProductsBtn handleLoadProducts={this.handleLoadSales} />

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeUser: state.user.activeUser,
    allSales: state.sale.allSales
  };
}

export default connect(mapStateToProps, { fetchUser, fetchSales })(SalesHistoryContainer);
