import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { SaleSuccess } from "types/sale";
import { round } from "utils/format";
import { BASE_URL } from "utils/requests";

type SeriesData = {
  name: string;
  data: number[];
}

type ChartData = {
  labels: {
    categories: string[];
  };
  series: SeriesData[];
}

function BarChart() {

  const [chartData, setChartData] = useState<ChartData>({
    labels: {
      categories: []
    },
    series: [
      {
        name: "",
        data: []
      }
    ]
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/v1/sales/success-by-seller`)
      .then(response => {
        const data = response.data as SaleSuccess[];
        const myLabels = data.map(label => label.sellerName);
        const mySeries = data.map(percent => round(100 * percent.deals / percent.visited, 1));

        setChartData({
          labels: {
            categories: myLabels
          },
          series: [
            {
              name: "% Success",
              data: mySeries
            }
          ]
        });
      });
  }, []);


  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
  };

  // const mockData = {
  //   labels: {
  //     categories: ['Ethel McCarthy', 'Madge Parsons', 'Claudia Byrd', 'Logan Owens', 'Brent Graves']
  //   },
  //   series: [
  //     {
  //       name: "% Sucesso",
  //       data: [43.6, 67.1, 67.7, 45.6, 71.1]
  //     }
  //   ]
  // };

  return (
    <Chart
      options={{ ...options, xaxis: chartData.labels }}
      series={chartData.series}
      type="bar"
      height="240"
    />
  );
}

export default BarChart;
