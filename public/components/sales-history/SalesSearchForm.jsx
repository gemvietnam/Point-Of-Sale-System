import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSalesByDate, fetchSales } from 'Actions';
import ComboBox from 'ComboBox';

// data options to feed ComboBox as props
import { comboYears, comboMonths, comboDays } from '../../config/config.js';

class SalesSearchForm extends Component {

	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
		this.refreshSales = this.refreshSales.bind(this);
	}

	handleSearch(event) {
		event.preventDefault();

		// startDate data
		const startYear = this.refs.form.selectStartYear.value;
		const startMonth = this.refs.form.selectStartMonth.value - 1; //JS months are 0-11
		const startDay = this.refs.form.selectStartDay.value;

		//endDate data
		const endYear = this.refs.form.selectEndYear.value;
		const endMonth = this.refs.form.selectEndMonth.value - 1; //JS months are 0-11
		const endDay = this.refs.form.selectEndDay.value;


    var startDate = new Date(startYear, startMonth, startDay);

		// 23 (hours) 59(minutes) 59(seconds) captures the end of the day,
		// while startDate is automatically set to the beginning of the day
    var endDate = new Date(endYear, endMonth, endDay, 23, 59, 59);

		//the result of this function will be set to this.props.allSales
		this.props.fetchSalesByDate(this.props.activeUser._id, startDate, endDate); //need to enter userId, startDate, and endDate as params

	}

	refreshSales(event) {
		// event.preventDefault();
		//resets this.props.allSales to the user's full list of sales
		this.props.fetchSales(this.props.activeUser._id);
	}

	render() {

		return (

			<form id="salesByDateForm" ref="form">

				{/*Start Dates Below*/}
				<div className="dateColumn col-lg-4 col-md-4 col-sm-4 col-xs-4">
					<p className="secondaryBlue">Date From</p>
					<div className="form-group">
						<label for="selectStartYear">Year</label>
						<ComboBox name={"selectStartYear"} comboList={comboYears} />
					</div>
					<div className="form-group">
						<label for="selectStartMonth">Month</label>
						<ComboBox name={"selectStartMonth"} comboList={comboMonths} />
					</div>
					<div className="form-group">
						<label for="selectStartDay">Day</label>
						<ComboBox name={"selectStartDay"} comboList={comboDays} />
					</div>
				</div>

				{/*End Dates Below*/}
				<div className="dateColumn col-lg-4 col-md-4 col-sm-4 col-xs-4">
					<p className="secondaryBlue">Date To</p>
					<div className="form-group">
						<label for="selectEndYear">Year</label>
						<ComboBox name={"selectEndYear"} comboList={comboYears} />
					</div>
					<div className="form-group">
						<label for="selectEndMonth">Month</label>
						<ComboBox name={"selectEndMonth"} comboList={comboMonths} />
					</div>
					<div className="form-group">
						<label for="selectEndDay">Day</label>
						<ComboBox name={"selectEndDay"} comboList={comboDays} />
					</div>
				</div>
				<div id="historyBtns" className="text-center col-lg-4 col-md-4 col-sm-4 col-xs-4">
					<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
						<button id="searchSalesBtn"
							onClick={this.handleSearch}
							type="submit"
							className="btn btn-primary">Search</button>
					</div>
					<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
						<i id="refreshSalesBtn"
							onClick={this.refreshSales}
							className="fa fa-refresh fa-3x"></i>
					</div>
				</div>
			</form>
		);
	}

};

function mapStateToProps(state) {
	return { activeUser: state.user.activeUser };
}

export default connect(mapStateToProps, { fetchSalesByDate, fetchSales })(SalesSearchForm);
