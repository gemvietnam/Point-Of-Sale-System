import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProducts, changeCategoryFilter } from 'Actions';

import ProductSearch from 'ProductSearch';
import ProductFilter from 'ProductFilter';
import SingleProduct from 'SingleProduct';
import CartContainer from 'CartContainer';
import LoadProductsBtn from 'LoadProductsBtn';
import LoadingSpinner from 'LoadingSpinner';
import _ from 'lodash';

class StoreFrontContainer extends Component {

  constructor(props) {
  	super(props);

  	this.state = {
      showProductsNum: 25
  	};

    this.handleFilter = this.handleFilter.bind(this);
    this.handleLoadProducts = this.handleLoadProducts.bind(this);
  }

  componentWillMount() {
		this.props.fetchProducts(); //Fetches all products when the page loads
	}

  handleLoadProducts() {
    // The number of products displayed on the screen, to be incremented by 25
    // per click
    const showMoreNum = this.state.showProductsNum + 25;

    this.setState({
      showProductsNum: showMoreNum
    });

  }

  handleFilter(event) {

    const { changeCategoryFilter } = this.props;
    const newCategory = event.target.innerHTML;

    switch (newCategory) {
      case 'All':
        return changeCategoryFilter(newCategory);
      case 'Pharmaceuticals':
        return changeCategoryFilter(newCategory);
      case 'Herbals':
        return changeCategoryFilter(newCategory);
      case 'Consumer':
        return changeCategoryFilter(newCategory);
      case 'OTC':
        return changeCategoryFilter(newCategory);
      default:
        return;
    }

	}

  renderLoader() {
    return(
      <div id="spinner">
        <LoadingSpinner />
      </div>
    );
  }

  renderLoadProductBtn() {

    // const { showAll, showPharma, showHerbals, showProductsNum } = this.state;
    const { showAll, showPharma, showHerbals, showConsumer, showOTC,
            allProducts, herbals, pharma, consumer, OTC } = this.props;
    const  { showProductsNum } = this.state;

    if (showAll && allProducts.length > showProductsNum) {
      return <LoadProductsBtn handleLoadProducts={this.handleLoadProducts} />;
    } else if (showPharma && pharma.length > showProductsNum) {
      return <LoadProductsBtn handleLoadProducts={this.handleLoadProducts} />;
    } else if (showHerbals && herbals.length > showProductsNum) {
      return <LoadProductsBtn handleLoadProducts={this.handleLoadProducts} />;
    } else if (showConsumer && consumer.length > showProductsNum) {
      return <LoadProductsBtn handleLoadProducts={this.handleLoadProducts} />;
    } else if (showOTC && OTC.length > showProductsNum) {
      return <LoadProductsBtn handleLoadProducts={this.handleLoadProducts} />;
    }

  }

  renderProducts() {

    const { showAll, showPharma, showHerbals, showConsumer, showOTC,
            allProducts, herbals, pharma, consumer, OTC } = this.props;
    const  { showProductsNum } = this.state;

    if (showAll) {
      return allProducts.slice(0, showProductsNum).map(product => {
        return (
          <div key={product._id} className="col-lg-3 col-md-3 col-sm-3 col-xs-6" id="productThumbnail">
            <SingleProduct
               key={product._id}
               product={product} />
          </div>
         );
      });
    } else if (showPharma) {
      return pharma.slice(0, showProductsNum).map(product => {
        return (
          <div key={product._id} className="col-lg-3 col-md-3 col-sm-3 col-xs-6" id="productThumbnail">
            <SingleProduct
              key={product._id}
              product={product} />
          </div>
         );
      });
    } else if (showHerbals) {
      return herbals.slice(0, showProductsNum).map(product => {
        return (
          <div key={product._id} className="col-lg-3 col-md-3 col-sm-3 col-xs-6" id="productThumbnail">
            <SingleProduct
              key={product._id}
              product={product} />
          </div>
         );
      });
    } else if (showConsumer) {
      return consumer.slice(0, showProductsNum).map(product => {
        return (
          <div key={product._id} className="col-lg-3 col-md-3 col-sm-3 col-xs-6" id="productThumbnail">
            <SingleProduct
              key={product._id}
              product={product} />
          </div>
         );
      });
    } else if (showOTC) {
      return OTC.slice(0, showProductsNum).map(product => {
        return (
          <div key={product._id} className="col-lg-3 col-md-3 col-sm-3 col-xs-6" id="productThumbnail">
            <SingleProduct
              key={product._id}
              product={product} />
          </div>
         );
      });
    }

  }

  render() {

    const { showAll, showPharma, showHerbals, showConsumer, showOTC, allProducts } = this.props;
    const  { showProductsNum } = this.state;

		return (
			<div>

				<div className="inventory">

					<div className="container">
						{/* This is the main row for '/inventory' */}
						<div className="row">
							{/* This column starts left half of the screen */}
							<div className="col-lg-6 col-md-6">

								<div className="row">
									<div className="col-lg-12 col-md-12">

                    <ProductFilter
                      showAll={showAll}
                      showPharma={showPharma}
                      showHerbals={showHerbals}
                      showConsumer={showConsumer}
                      showOTC={showOTC}
                      handleFilter={this.handleFilter} />

										<ProductSearch
                      showAll={showAll}
                      showPharma={showPharma}
                      showHerbals={showHerbals}
                      showConsumer={showConsumer}
                      showOTC={showOTC} />

                    <p id="topProductsMessage">Top {showProductsNum} Products</p>

									</div>

									<div className="col-lg-12 col-md-12">
                    {/* During initial product load (allProducts), show loading spinner
                      until allProducts has a length */}
										{allProducts.length ?
                    this.renderProducts() : this.renderLoader()}

									</div>

                  <div className="text-center">
                    {this.renderLoadProductBtn()}
                  </div>


								</div>

							</div>
							{/* End left half of screen */}

							{/* This column starts right half of the screen */}
							<div className="col-lg-6 col-md-6">
                {/* Begin Cart */}
								<CartContainer />
							</div>
							{/* Ends right half of screen */}

						</div>
					</div>
				</div>
			</div>
		);
	}

}

function mapStateToProps(state) {
	//delete active user later
	return {
    allProducts: state.products.all,
    herbals: state.products.herbals,
    pharma: state.products.pharma,
    consumer: state.products.consumer,
    OTC: state.products.OTC,
    activeUser: state.user.activeUser,
    showAll: state.categories.showAll,
    showPharma: state.categories.showPharma,
    showHerbals: state.categories.showHerbals,
    showConsumer: state.categories.showConsumer,
    showOTC: state.categories.showOTC
  };
}

export default connect(mapStateToProps, { fetchProducts, changeCategoryFilter })(StoreFrontContainer);
