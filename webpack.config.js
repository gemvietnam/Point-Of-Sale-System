var webpack = require('webpack');

module.exports = {
  entry: [
    './public/index.jsx'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      App: 'public/components/App.jsx',
      LandingPage: 'public/components/landing-pages/LandingPage.jsx',
      About: 'public/components/landing-pages/About.jsx',
      Footer: 'public/components/Footer.jsx',
      StoreFrontContainer: 'public/components/store-front/StoreFrontContainer.jsx',
      LoginFormContainer: 'public/components/nav/LoginFormContainer.jsx',
      PostAuthSideNavbar: 'public/components/nav/PostAuthSideNavbar.jsx',
      Navbar: 'public/components/nav/Navbar.jsx',
      NavBarContainer: 'public/components/nav/NavBarContainer.jsx',
      ProductSearch: 'public/components/store-front/inventory/ProductSearch.jsx',
      ProductFilter: 'public/components/store-front/inventory/ProductFilter.jsx',
      SingleProduct: 'public/components/store-front/inventory/SingleProduct.jsx',
      SingleProductSymbol: 'public/components/store-front/inventory/SingleProductSymbol.jsx',
      LoadProductsBtn: 'public/components/common/LoadProductsBtn.jsx',
      ProductProfile: 'public/components/ProductProfile.jsx',
      Signup: 'public/components/Signup.jsx',
      UserDashboardContainer: 'public/components/user-dashboard/UserDashboardContainer.jsx',
      StoreSettingsContainer: 'public/components/user-dashboard/store-settings/StoreSettingsContainer.jsx',
      TaxThumbnail: 'public/components/user-dashboard/store-settings/TaxThumbnail.jsx',
      AddEmployeeThumbnail: 'public/components/user-dashboard/store-settings/AddEmployeeThumbnail.jsx',
      ListEmployeeTabs: 'public/components/user-dashboard/store-settings/ListEmployeeTabs.jsx',
      SingleEmployeeTab: 'public/components/user-dashboard/store-settings/SingleEmployeeTab.jsx',
      EmployeeProfileContainer: 'public/components/user-dashboard/store-settings/employee-details/EmployeeProfileContainer.jsx',
      EditEmployeeForm: 'public/components/user-dashboard/store-settings/employee-details/EditEmployeeForm.jsx',
      EmployeeSalesData: 'public/components/user-dashboard/store-settings/employee-details/EmployeeSalesData.jsx',
      ActiveEmployeeThumbnail: 'public/components/user-dashboard/store-settings/ActiveEmployeeThumbnail.jsx',
      SalesHistoryContainer: 'public/components/sales-history/SalesHistoryContainer.jsx',
      SalesHistoryTable: 'public/components/sales-history/SalesHistoryTable.jsx',
      SalesHistoryRow: 'public/components/sales-history/SalesHistoryRow.jsx',
      SaleDetailsContainer: 'public/components/sales-history/SaleDetailsContainer.jsx',
      SaleProfile: 'public/components/sales-history/SaleProfile.jsx',
      SoldItemThumbnail: 'public/components/sales-history/SoldItemThumbnail.jsx',
      SalesSearchForm: 'public/components/sales-history/SalesSearchForm.jsx',
      CartContainer: 'public/components/store-front/cart/CartContainer.jsx',
      CartHeader: 'public/components/store-front/cart/CartHeader.jsx',
      CartProductsTable: 'public/components/store-front/cart/CartProductsTable.jsx',
      CartProductRow: 'public/components/store-front/cart/CartProductRow.jsx',
      CartTotalsTable: 'public/components/store-front/cart/CartTotalsTable.jsx',
      UndoSaleBtn: 'public/components/store-front/cart/UndoSaleBtn.jsx',
      ClearCartBtn: 'public/components/store-front/cart/ClearCartBtn.jsx',
      PlusMinusBtns: 'public/components/store-front/cart/PlusMinusBtns.jsx',
      RequireAuth: 'public/components/auth/require_auth.jsx',
      Signout: 'public/components/Signout.jsx',
      AllProducts: 'public/components/AllProducts.jsx',
      NewProductForm: 'public/components/NewProductForm.jsx',
      EditProductForm: 'public/components/EditProductForm.jsx',
      ManageProductForm: 'public/components/ManageProductForm.jsx',
      ReportingContainer: 'public/components/reporting/ReportingContainer.jsx',
      RevenueThumbnail: 'public/components/reporting/revenue/RevenueThumbnail.jsx',
      TodaysRevenueChart: 'public/components/reporting/revenue/TodaysRevenueChart.jsx',
      ThisWeeksRevenueChart: 'public/components/reporting/revenue/ThisWeeksRevenueChart.jsx',
      AllMonthsRevenueChart: 'public/components/reporting/revenue/AllMonthsRevenueChart.jsx',
      TopItemsPanel: 'public/components/reporting/items/TopItemsPanel.jsx',
      TodaysTopItemsTable: 'public/components/reporting/items/TodaysTopItemsTable.jsx',
      TodaysTopItemsRow: 'public/components/reporting/items/TodaysTopItemsRow.jsx',
      WeeksTopItemsTable: 'public/components/reporting/items/WeeksTopItemsTable.jsx',
      WeeksTopItemsRow: 'public/components/reporting/items/WeeksTopItemsRow.jsx',
      MonthsTopItemsTable: 'public/components/reporting/items/MonthsTopItemsTable.jsx',
      MonthsTopItemsRow: 'public/components/reporting/items/MonthsTopItemsRow.jsx',
      ForgotPassword: 'public/components/ForgotPassword',
      ForgotEmployeePassword: 'public/components/ForgotEmployeePassword',
      RequestReset: 'public/components/RequestReset',
      AddProductBtn: 'public/components/common/AddProductBtn.jsx',
      BackArrowBtn: 'public/components/common/BackArrowBtn.jsx',
      EditProductBtn: 'public/components/common/EditProductBtn.jsx',
      DeleteBtn: 'public/components/common/DeleteBtn.jsx',
      ExpandProductIcon: 'public/components/common/ExpandProductIcon.jsx',
      LoadingSpinner: 'public/components/common/LoadingSpinner.jsx',
      ProductCategoryIcon: 'public/components/common/ProductCategoryIcon.jsx',
      Modal: 'public/components/common/Modal.jsx',
      ComboBox: 'public/components/common/ComboBox.jsx',
      Actions: 'public/actions/index.js',
      ActionTypes: 'public/actions/actionTypes.js'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader', //Converts all ES6 files into ES5
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
};
