import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { SaleSum } from "types/sale";
import { BASE_URL } from "utils/requests";

type ChartData = {
  labels: string[];
  series: number[];
}

function DonutChart() {

  const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

  useEffect(() => {
    axios.get(`${BASE_URL}/api/v1/sales/amount-by-seller`)
      .then(response => {
        const data = response.data as SaleSum[];
        const myLabels = data.map(label => label.sellerName);
        const mySeries = data.map(series => series.sum);

        setChartData({ labels: myLabels, series: mySeries });
      });
  }, []);

  //   const mockData = {
  //     series: [477138, 499928, 444867, 220426, 473088],
  //     labels: ['Ethel McCarthy', 'Madge Parsons', 'Claudia Byrd', 'Logan Owens', 'Brent Graves']
  // }

  const options = {
    legend: {
      show: true
    }
  }

  return (
    <Chart
      options={{ ...options, labels: chartData.labels }}
      series={chartData.series}
      type="donut"
      height="240"
    />
  );
}

export default DonutChart;
