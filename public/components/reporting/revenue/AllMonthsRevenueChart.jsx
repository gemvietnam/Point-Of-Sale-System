import React, { Component } from 'react';
import moment from 'moment';

class AllMonthsRevenueChart extends Component {

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
      return monthData[1];
    });

    this.setState({
      dataRowsForChart
    }, () => {
      this.drawThisWeeksRevenueChart();
    });
  }

  drawThisWeeksRevenueChart() {

    var ctx = document.getElementById('myMonthChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'March', 'April',
                 'May', 'June', 'July', 'August',
                 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Total Revenue Per Month',
          data: this.state.dataRowsForChart,
          backgroundColor: "rgba(255,152,133, 0.9)"
        }]
      }
    });

	}

  render() {
    return (
      <canvas id="myMonthChart"></canvas>
    );
  }

}

export default AllMonthsRevenueChart;
