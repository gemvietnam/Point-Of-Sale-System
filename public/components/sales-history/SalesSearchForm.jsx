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

		console.log("Start Date ", startDate);
		console.log("End Date ", endDate);

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
				<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
					<div className="form-group">
						<label for="selectStartYear">Start Year</label>
						<ComboBox name={"selectStartYear"} comboList={comboYears} />
					</div>
					<div className="form-group">
						<label for="selectStartMonth">Start Month</label>
						<ComboBox name={"selectStartMonth"} comboList={comboMonths} />
					</div>
					<div className="form-group">
						<label for="selectStartDay">Start Day</label>
						<ComboBox name={"selectStartDay"} comboList={comboDays} />
					</div>
				</div>

				{/*End Dates Below*/}
				<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
					<div className="form-group">
						<label for="selectEndYear">End Year</label>
						<ComboBox name={"selectEndYear"} comboList={comboYears} />
					</div>
					<div className="form-group">
						<label for="selectEndMonth">End Month</label>
						<ComboBox name={"selectEndMonth"} comboList={comboMonths} />
					</div>
					<div className="form-group">
						<label for="selectEndDay">End Day</label>
						<ComboBox name={"selectEndDay"} comboList={comboDays} />
					</div>
				</div>
				<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 col-lg-offset-3 col-md-offset-3 ">
					<button id="searchSalesBtn" onClick={this.handleSearch} type="submit" className="btn btn-primary">Search By Date</button>
				</div>
				<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
					<i id="refreshSalesBtn" onClick={this.refreshSales} className="fa fa-refresh fa-3x"></i>
				</div>
			</form>
		);
	}

};

function mapStateToProps(state) {
	return { activeUser: state.user.activeUser };
}

export default connect(mapStateToProps, { fetchSalesByDate, fetchSales })(SalesSearchForm);
