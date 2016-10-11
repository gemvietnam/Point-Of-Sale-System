import React, { Component } from 'react';

class ThisWeeksRevenueChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataRowsForChart: []
    };
    this.drawThisWeeksRevenueChart = this.drawThisWeeksRevenueChart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.salesData.length) {
      this.formatDataForThisWeeksChart(nextProps.salesData);
    }
  }

  formatDataForThisWeeksChart(salesData) {

    let dataRowsForChart = salesData.map(monthData => {

      // this is a blatant hack for offsetting heroku's 13 hour time surplus in deployment
      let newDate = new Date(monthData[0]);
      let currentMinutes = newDate.getMinutes();
      let currentHour = newDate.getHours() - 13;
      let currentDay = newDate.getDate();
      let currentMonth = newDate.getMonth();
      let currentYear = newDate.getFullYear();

      // the previous code below
      // let newMonthData = [new Date(monthData[0], monthData[1])];

      let newMonthData = [new Date(currentYear, currentMonth, currentDay, currentHour, currentMinutes), monthData[1]];
      return newMonthData;
    });

    this.setState({
      dataRowsForChart
    }, () => {
      google.charts.setOnLoadCallback(this.drawThisWeeksRevenueChart);
    });
  }

  drawThisWeeksRevenueChart() {

    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Revenue');

    data.addRows(this.state.dataRowsForChart);

  	var options = google.charts.Bar.convertOptions({
      title: 'Revenue for this week'
  	});

  	var chart = new google.charts.Bar(document.getElementById('chart_revenue_week'));

  	chart.draw(data, options);

	}

  render() {
    return (
      <div id="chart_revenue_week"></div>
    );
  }

}

export default ThisWeeksRevenueChart;
