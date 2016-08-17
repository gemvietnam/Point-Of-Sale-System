import React, { Component } from 'react';

class AllMonthsRevenueChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataRowsForChart: []
    };
    this.drawAllMonthsChart = this.drawAllMonthsChart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.salesData.length) {
      this.formatDataForMonthsChart(nextProps.salesData);
    }
  }

  formatDataForMonthsChart(salesData) {

    let dataRowsForChart = salesData.map(monthData => {
      //monthData[0] is the string value of each month of a year
      let newMonthData = [new Date(monthData[0]), monthData[1]];
      return newMonthData;
    });

    this.setState({
      dataRowsForChart
    }, () => {
      google.charts.setOnLoadCallback(this.drawAllMonthsChart);
    });
  }

  drawAllMonthsChart() {

		var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Revenue');

    data.addRows(this.state.dataRowsForChart);

  	var options = google.charts.Bar.convertOptions({
      title: 'Total Revenue by Month'
  	});

  	var chart = new google.charts.Bar(document.getElementById('chart_revenue_months'));

  	chart.draw(data, options);

	}

  render() {
    return (
      <div id="chart_revenue_months"></div>
    );
  }

}

export default AllMonthsRevenueChart;
