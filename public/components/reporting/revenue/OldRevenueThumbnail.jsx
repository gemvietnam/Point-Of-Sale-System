import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'Actions';

class RevenueThumbnail extends Component {

	constructor(props) {

		super(props);

		const currentDate = new Date();
		const currentDay = currentDate.getDate();
		const currentMonth = currentDate.getMonth();
		const currentYear = currentDate.getFullYear();

		this.state = {
			currentDay,
			currentMonth,
			currentYear,
			todaysTotalRevenue: 0,
			weekTotalRevenue: 0,
			monthTotalRevenue: 0,
			dataRowsForTodaysRevenue: [],
			dataRowsForWeeksRevenue: [],
			dataRowsForMonthRevenue: []
		};

	}

	componentWillMount() {



		//Loads all sales belonging to a user
		this.props.fetchSales(this.props.activeUser._id).then(() => {
			// 3 below functions load total revenue for today, the week, and the month
			this.calculateTodaysRevenue();
			this.calculateWeekRevenue();
			this.calculateMonthRevenue();
			this.calculateEveryMonthsRevenue();
		});

	}

	render() {
		return (
			<div className="revenueThumbnail">

				<div className="col-lg-12 col-md-12" >
					<div className="thumbnail">
					  <div id="chart_revenue_day"></div>
					  <div className="caption">
					    <h3>Todays Total Revenue: ${this.state.todaysTotalRevenue}</h3>
					  </div>
					</div>
				</div>

				<div className="col-lg-12 col-md-12" >
					<div className="thumbnail">
					  <div id="chart_revenue_week"></div>
					  <div className="caption">
					    <h3>Week Total Revenue: ${this.state.weekTotalRevenue}</h3>
					  </div>
					</div>
				</div>

				<div className="col-lg-12 col-md-12" >
					<div className="thumbnail">
					  <div id="chart_revenue_month"></div>
					  <div className="caption">
					    <h3>Month Total Revenue: ${this.state.monthTotalRevenue}</h3>
					  </div>
					</div>
				</div>

			</div>
		);

	}
	calculateTodaysRevenue() {
		//all of today's date values pulled from state
		const { currentDay, currentMonth, currentYear } = this.state;

		let todaysTotalRevenue = 0;
		let dataRowsForTodaysRevenue = [];

		this.props.allSales.map((sale) => {

			//checks the date key of each sale to see if it matches today's date
			if (sale.date.day === currentDay && sale.date.month === currentMonth && sale.date.year === currentYear) {
				todaysTotalRevenue += sale.total; //Adds each sale's total revenue per interation

				let time = [];
				time.push(sale.date.hour, sale.date.minutes);
				dataRowsForTodaysRevenue.push([time, todaysTotalRevenue]);

			} else { return; }

		});

		//sets profits and data rows for the graph only for today's data in local state
		this.setState({
			todaysTotalRevenue,
			dataRowsForTodaysRevenue
		}, () => {
			//After revenue is calculated and data for today is set in local state, draw chart for today's revenue
			google.charts.setOnLoadCallback(this.drawTodaysChart.bind(this));
		});

	}

	calculateWeekRevenue() {

		//all of today's date values pulled from local state
		const { currentDay, currentMonth, currentYear } = this.state;

		//weekTotalRevenue will be set to local state after all user sales are mapped
		let weekTotalRevenue = 0;

		//define six variables for the revenue of the past 6 days
		let sixDaysAgoRevenue = 0;
		let fiveDaysAgoRevenue = 0;
		let fourDaysAgoRevenue = 0;
		let threeDaysAgoRevenue = 0;
		let twoDaysAgoRevenue = 0;
		let oneDayAgoRevenue = 0;
		//use this.state.todaysTotalRevenue for today


		this.props.allSales.map((sale) => {

			//checks to see if sale was made this week by comparing the sale's date property to today's date
			if (sale.date.month === currentMonth && sale.date.year === currentYear && sale.date.day <= currentDay
				&& sale.date.day >= currentDay - 7) {

				weekTotalRevenue += sale.total;


				if (sale.date.month === currentMonth && sale.date.year === currentYear && sale.date.day === currentDay - 6) {

					return sixDaysAgoRevenue += sale.total;


				} else if (sale.date.month === currentMonth && sale.date.year === currentYear && sale.date.day === currentDay - 5) {

					return fiveDaysAgoRevenue += sale.total;


				} else if (sale.date.month === currentMonth && sale.date.year === currentYear && sale.date.day === currentDay - 4) {

					return fourDaysAgoRevenue += sale.total;


				} else if (sale.date.month === currentMonth && sale.date.year === currentYear && sale.date.day === currentDay - 3) {

					return threeDaysAgoRevenue += sale.total;


				} else if (sale.date.month === currentMonth && sale.date.year === currentYear && sale.date.day === currentDay - 2) {

					return twoDaysAgoRevenue += sale.total;


				} else if (sale.date.month === currentMonth && sale.date.year === currentYear && sale.date.day === currentDay - 1) {

					return oneDayAgoRevenue += sale.total;

				}

			} else { return; } //not sure if I need this return statement

		});

		//Sets all of the data just calculated in the above if else chain
		//to dataRowsForWeeksRevenue which will be set in local state and used in this.drawWeekChart()
		let dataRowsForWeeksRevenue = [
			[new Date(currentYear, currentMonth, currentDay - 6), sixDaysAgoRevenue],
      [new Date(currentYear, currentMonth, currentDay - 5), fiveDaysAgoRevenue],
      [new Date(currentYear, currentMonth, currentDay - 4), fourDaysAgoRevenue],
      [new Date(currentYear, currentMonth, currentDay - 3), threeDaysAgoRevenue],
      [new Date(currentYear, currentMonth, currentDay - 2), twoDaysAgoRevenue],
      [new Date(currentYear, currentMonth, currentDay - 1), oneDayAgoRevenue],
      [new Date(currentYear, currentMonth, currentDay), this.state.todaysTotalRevenue]
		];

		//sets total revenue and the dataRows for the week in local state (to be used in this.drawWeekChart())
		this.setState({
			weekTotalRevenue,
			dataRowsForWeeksRevenue
		}, () => {
			//After revenue is calculated and data for the week is set in local state, draw chart for week's revenue
			 google.charts.setOnLoadCallback(this.drawWeekChart.bind(this));
		});

	}

	calculateMonthRevenue() {

		//all of today's date values pulled from state
		const { currentDay, currentMonth, currentYear } = this.state;
		let monthTotalRevenue = 0;


		this.props.allSales.map((sale) => {

			//checks each sale's date property to see if sale was made this month
			if (sale.date.month === currentMonth && sale.date.year === currentYear) {

				monthTotalRevenue += sale.total; //Adds each sale's total revenue per interation

			} else { return; }

		});



		//sets total revenue for the month and data rows for the graph in local state
		this.setState({
			monthTotalRevenue
		});
	}

	calculateEveryMonthsRevenue() {

		//all of today's date values pulled from state
		const { currentDay, currentMonth, currentYear } = this.state;

		//define 12 variables for each month's total revenue
		let janRevenue = 0;
		let febRevenue = 0;
		let marchRevenue = 0;
		let aprilRevenue = 0;
		let mayRevenue = 0;
		let juneRevenue = 0;
		let julyRevenue = 0;
		let augRevenue = 0;
		let septRevenue = 0;
		let octRevenue = 0;
		let novRevenue = 0;
		let decRevenue = 0;

		this.props.allSales.map((sale) => {

			//checks each sale's date property to see which month sale was made during and adds to variables above
			if (sale.date.month === 0) { janRevenue += sale.total; }
			else if (sale.date.month === 1) { febRevenue += sale.total; }
			else if (sale.date.month === 2) { marchRevenue += sale.total; }
			else if (sale.date.month === 3) { aprilRevenue += sale.total; }
			else if (sale.date.month === 4) { mayRevenue += sale.total; }
			else if (sale.date.month === 5) { juneRevenue += sale.total; }
			else if (sale.date.month === 6) { julyRevenue += sale.total; }
			else if (sale.date.month === 7) { augRevenue += sale.total; }
			else if (sale.date.month === 8) { septRevenue += sale.total; }
			else if (sale.date.month === 9) { octRevenue += sale.total; }
			else if (sale.date.month === 10) { novRevenue += sale.total; }
			else { decRevenue += sale.total; }

		});

		let dataRowsForMonthRevenue = [
			[new Date(currentYear, 0), janRevenue],
			[new Date(currentYear, 1), febRevenue],
			[new Date(currentYear, 2), marchRevenue],
			[new Date(currentYear, 3), aprilRevenue],
			[new Date(currentYear, 4), mayRevenue],
			[new Date(currentYear, 5), juneRevenue],
			[new Date(currentYear, 6), julyRevenue],
			[new Date(currentYear, 7), augRevenue],
			[new Date(currentYear, 8), septRevenue],
			[new Date(currentYear, 9), octRevenue],
			[new Date(currentYear, 10), novRevenue],
			[new Date(currentYear, 11), decRevenue]
		];

		this.setState({
			dataRowsForMonthRevenue
		}, () => {
			//After revenue for every month is calculated draw the chart
			 google.charts.setOnLoadCallback(this.drawMonthChart());
		});

	}

	drawTodaysChart() {

		var data = new google.visualization.DataTable();
    data.addColumn('timeofday', 'Time');
    data.addColumn('number', 'Revenue');
    data.addRows(this.state.dataRowsForTodaysRevenue);

    //need to figure out how to make the time value display properly in the hAxis
    var options = {
        hAxis: {
          title: 'Time of Day'
        },
        vAxis: {
          title: "Today's Total Revenue"
        },
        backgroundColor: '#f1f8e9',
        theme: 'material'
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_revenue_day'));
    chart.draw(data, options);

	}

	drawWeekChart() {

		var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Revenue');

    data.addRows(this.state.dataRowsForWeeksRevenue);

  	var options = google.charts.Bar.convertOptions({
      title: 'Revenue for this week'
  	});

  	var chart = new google.charts.Bar(document.getElementById('chart_revenue_week'));

  	chart.draw(data, options);

	}

	drawMonthChart() {

		var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Revenue');

    data.addRows(this.state.dataRowsForMonthRevenue);

  	var options = google.charts.Bar.convertOptions({
      title: 'Total Revenue by Month'
  	});

  	var chart = new google.charts.Bar(document.getElementById('chart_revenue_month'));

  	chart.draw(data, options);

	}

}

function mapStateToProps(state) {
	const todaysSalesFormattedForChart = state.allSales.map()
	return { allSales: state.sale.allSales, activeUser: state.user.activeUser };
}

export default connect(mapStateToProps, actions)(RevenueThumbnail);
