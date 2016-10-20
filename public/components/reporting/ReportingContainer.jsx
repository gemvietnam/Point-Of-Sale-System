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

// RevenueThumbnail will contain a single chart (day, week, or month)
import RevenueThumbnail from 'RevenueThumbnail';
// TopItemsPanel will contain a single table (day, week, or month)
import TopItemsPanel from 'TopItemsPanel';

// import revenue charts for today, week, and month
import TodaysRevenueChart from 'TodaysRevenueChart';
import ThisWeeksRevenueChart from 'ThisWeeksRevenueChart';
import AllMonthsRevenueChart from 'AllMonthsRevenueChart';

// import top selling items tables for today, week, and month
import TodaysTopItemsTable from 'TodaysTopItemsTable';
import WeeksTopItemsTable from 'WeeksTopItemsTable';
import MonthsTopItemsTable from 'MonthsTopItemsTable';



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

				{/* 3 thumbnails containing revenue charts (day, week, month) */}
					<RevenueThumbnail
						totalRevenue={this.props.todaysTotalRevenue}
						salesData={this.props.todaysSales}
						name={"Today's"}
						ChartComponent={TodaysRevenueChart}
					/>

					<RevenueThumbnail
						totalRevenue={this.props.thisWeeksTotalRevenue}
						salesData={this.props.revenueForDaysThisWeek}
						name={"Week's"}
						ChartComponent={ThisWeeksRevenueChart}
					/>

					<RevenueThumbnail
						totalRevenue={this.props.thisMonthsTotalRevenue}
						salesData={this.props.everyMonthsRevenue}
						name={"Month's"}
						ChartComponent={AllMonthsRevenueChart}
					/>

					{/* 3 top items panels containing tables (day, week, month) */}
					<TopItemsPanel
						name={"Today's"}
						items={this.props.todaysTopItems}
						TopItemsTable={TodaysTopItemsTable}
					/>

					<TopItemsPanel
						name={"Week's"}
						items={this.props.weeksTopItems}
						TopItemsTable={WeeksTopItemsTable}
					/>

					<TopItemsPanel
						name={"Month's"}
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
