import React, { Component } from 'react';

class TodaysRevenueChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataRowsForChart: []
    };
    this.drawTodaysChart = this.drawTodaysChart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.salesData.length) {
      this.formatTodaysSalesForChart(nextProps.salesData);
    }
  }

  formatTodaysSalesForChart(arrayOfSales) {

		let todaysRevenueAtGivenTime = 0;

		//the map issue is here
		let dataRowsForTodaysRevenueChart = arrayOfSales.map(sale => {
			todaysRevenueAtGivenTime += sale.total;
			let time = [];
			time.push(sale.date.hour, sale.date.minutes);
			return [time, todaysRevenueAtGivenTime];
		});

    this.setState({
      dataRowsForChart: dataRowsForTodaysRevenueChart
    }, () => {
      google.charts.setOnLoadCallback(this.drawTodaysChart);
    });

	}

  drawTodaysChart() {

		var data = new google.visualization.DataTable();
    data.addColumn('timeofday', 'Time');
    data.addColumn('number', 'Revenue');
    data.addRows(this.state.dataRowsForChart);

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

  render() {
    return (
      <div id="chart_revenue_day"></div>
    );
  }

}

export default TodaysRevenueChart;
