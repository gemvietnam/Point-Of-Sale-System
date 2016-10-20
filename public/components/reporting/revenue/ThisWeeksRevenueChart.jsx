import React, { Component } from 'react';
import moment from 'moment';

class ThisWeeksRevenueChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      labelsForChart: [],
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

    let dataRowsForChart = salesData.map(weekDayData => {
      return weekDayData[1];
    });
    let labelsForChart = salesData.map(weekDayData => {
      let newDate = new Date(weekDayData[0]);
      let month = newDate.getMonth() + 1;
      let day = newDate.getDate();
      return `${month}/${day}`;
    });

    this.setState({
      labelsForChart,
      dataRowsForChart
    }, () => {
      this.drawThisWeeksRevenueChart();
    });
  }

  drawThisWeeksRevenueChart() {

    var ctx = document.getElementById('myWeekChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.state.labelsForChart,
        datasets: [{
          label: 'Revenue Per Day of Week',
          data: this.state.dataRowsForChart,
          backgroundColor: "rgba(44,135,243,0.4)"
        }]
      }
    });

	}

  render() {
    return (
      <canvas id="myWeekChart"></canvas>
    );
  }

}

export default ThisWeeksRevenueChart;
