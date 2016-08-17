import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	fetchUser,
	loadTodaysTopItems,
	loadWeeksTopItems,
	loadMonthsTopItems,
	calculateTodaysRevenue,
	calculateEveryMonthsRevenue,
	calculateRevenueForDaysThisWeek
} from 'Actions';

import RevenueThumbnail from 'RevenueThumbnail';
import TopItemsPanel from 'TopItemsPanel';

import TodaysTopItemsTable from 'TodaysTopItemsTable';
import WeeksTopItemsTable from 'WeeksTopItemsTable';
import MonthsTopItemsTable from 'MonthsTopItemsTable';

import TodaysRevenueChart from 'TodaysRevenueChart';
import ThisWeeksRevenueChart from 'ThisWeeksRevenueChart';
import AllMonthsRevenueChart from 'AllMonthsRevenueChart';

class ReportingContainer extends Component {

	componentWillMount() {
		//Checks to see if the activeUser's info has loaded before fetching data
		if (this.props.activeUser) {
			//calculate todays, weeks, and months revenue to pass down to corresponding charts
			this.props.calculateTodaysRevenue(this.props.activeUser._id);
			this.props.calculateRevenueForDaysThisWeek(this.props.activeUser._id);
			this.props.calculateEveryMonthsRevenue(this.props.activeUser._id);

			//fetch todays, weeks, and months top items to pass down into top items table components
			this.props.loadTodaysTopItems(this.props.activeUser._id);
			this.props.loadWeeksTopItems(this.props.activeUser._id);
			this.props.loadMonthsTopItems(this.props.activeUser._id);

		} else {
			//activeUser's data isn't loaded, so fetch the logged in user, then the data
			this.props.fetchUser().then(response => {
				const userId = response.payload.data._id;

				//calculate todays, weeks, and months revenue to pass down to corresponding charts
				this.props.calculateTodaysRevenue(userId);
				this.props.calculateRevenueForDaysThisWeek(userId);
				this.props.calculateEveryMonthsRevenue(userId);

				//fetch todays, weeks, and months top items to pass down into top items table components
				this.props.loadTodaysTopItems(userId);
				this.props.loadWeeksTopItems(userId);
				this.props.loadMonthsTopItems(userId);
			});
		}


	}

	render() {

		return (

			<div className="container">
				<div className="row">

					<RevenueThumbnail
						totalRevenue={this.props.todaysTotalRevenue}
						salesData={this.props.todaysSales}
						name={"Today's"}
						ChartComponent={TodaysRevenueChart}
					/>

					<RevenueThumbnail
						totalRevenue={this.props.thisWeeksTotalRevenue}
						salesData={this.props.revenueForDaysThisWeek}
						name={"This Week's"}
						ChartComponent={ThisWeeksRevenueChart}
					/>

					<RevenueThumbnail
						totalRevenue={this.props.thisMonthsTotalRevenue}
						salesData={this.props.everyMonthsRevenue}
						name={"This Month's"}
						ChartComponent={AllMonthsRevenueChart}
					/>

					<TopItemsPanel
						name={"Today's"}
						items={this.props.todaysTopItems}
						TopItemsTable={TodaysTopItemsTable}
					/>

					<TopItemsPanel
						name={"This Week's"}
						items={this.props.weeksTopItems}
						TopItemsTable={WeeksTopItemsTable}
					/>

					<TopItemsPanel
						name={"This Month's"}
						items={this.props.monthsTopItems}
						TopItemsTable={MonthsTopItemsTable}
					/>

				</div>
			</div>

		);
	}

}

function mapStateToProps(state) {
	return {
		activeUser: state.user.activeUser,
		todaysTotalRevenue: state.revenueReporting.todaysTotalRevenue,
		thisWeeksTotalRevenue: state.revenueReporting.thisWeeksTotalRevenue,
		thisMonthsTotalRevenue: state.revenueReporting.thisMonthsTotalRevenue,
		todaysSales: state.sale.todaysSales,
		revenueForDaysThisWeek: state.revenueReporting.revenueForDaysThisWeek,
		everyMonthsRevenue: state.revenueReporting.everyMonthsRevenue,
		todaysTopItems: state.itemReporting.todaysTopItems,
		weeksTopItems: state.itemReporting.weeksTopItems,
		monthsTopItems: state.itemReporting.monthsTopItems,
	};
}

export default connect(mapStateToProps,
	{ fetchUser,
		loadTodaysTopItems,
	  loadWeeksTopItems,
	  loadMonthsTopItems,
	  calculateTodaysRevenue,
		calculateRevenueForDaysThisWeek,
	  calculateEveryMonthsRevenue })(ReportingContainer);
