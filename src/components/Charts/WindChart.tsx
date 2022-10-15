import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

interface WindChartProps {
  windSpeed: number | undefined;
}

function generateWindData(speed: number | undefined): number[] {
  const arr: number[] = Array.from({ length: 15 }, () =>
    Math.floor(Math.random() * (speed! - 0.5))
  );
  arr[8] = speed!;
  return arr;
}

const WindChart: React.FC<WindChartProps> = (props) => {
  return (
    <Line
      datasetIdKey="id"
      height={130}
      data={{
        labels: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
        ],
        datasets: [
          {
            label: "",
            data: generateWindData(props.windSpeed),
            tension: 0.6,
            borderColor: "#31DAFF",
            pointStyle: "none",
            borderJoinStyle: "round",
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        animations: {
          tension: {
            duration: 2000,
            easing: "linear",
            from: 0.6,
            to: 0.2,
            loop: true,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          xAxis: {
            display: false,
            offset: true,
            grid: {
              display: false,
              drawOnChartArea: true,
              drawBorder: false,
            },
          },
          yAxis: {
            display: false,
            min: -0.1,
            beginAtZero: true,
            ticks: {
              stepSize: 100,
              callback: function (value, index, values) {
                return "";
              },
            },
          },
        },
      }}
    />
  );
};

export default React.memo(WindChart);
