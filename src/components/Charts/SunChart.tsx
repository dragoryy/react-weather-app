import React from "react";
import { Line } from "react-chartjs-2";
import { formatDate } from "../../utils/dateUtils";
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

interface SunChartProps {
  time: number | undefined;
  timezone: number | undefined;
}

function generateSunData(
  time: number | undefined,
  timezone: number | undefined,
  type?: string
): (number | null)[] {
  let arr: (number | null)[] = [];
  const timeStamp: number | string = formatDate(time, timezone, "hour");
  const hours = 24;
  if (type === "image") {
    for (let i = 1; i <= hours; i++) {
      if (i === Number(timeStamp)) {
        if (i === 24) {
          let newArr: number[] = [1];
          return newArr;
        }
        if (i > 12) {
          arr.push(hours - i);
        } else {
          if (i === 12) {
            arr.push(11.5);
          } else {
            arr.push(i);
          }
        }
      } else {
        arr.push(null);
      }
    }
  } else {
    for (let i = 1; i <= hours; i++) {
      if (i <= timeStamp) {
        if (i === 24) {
          let newArr: number[] = [1];
          return newArr;
        }
        if (i > 12) {
          arr.push(hours - i);
        } else {
          if (i === 12) {
            arr.push(11.5);
          } else {
            arr.push(i);
          }
        }
      }
    }
  }
  return arr;
}

const SunChart: React.FC<SunChartProps> = (props) => {
  let sunImage: HTMLImageElement = new Image();
  sunImage.src = "/img/widgets/sun.svg";
  return (
    <Line
      datasetIdKey="id"
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
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
        ],
        datasets: [
          {
            label: "",
            data: generateSunData(props.time, props.timezone, "image"),
            tension: 0.6,
            borderJoinStyle: "round",
            borderColor: "orange",
            pointRadius: 1,
            pointStyle: [sunImage],
          },
          {
            label: "",
            data: generateSunData(props.time, props.timezone),
            tension: 0.6,
            borderJoinStyle: "round",
            borderDash: [5, 4],
            pointRadius: 0,
            borderWidth: 3,
            borderColor: "yellow",
          },
          {
            label: "",
            data: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11.5, 11, 10, 9, 8, 7, 6, 5, 4,
              3, 2, 1,
            ],
            tension: 0.6,
            pointRadius: 0,
            borderJoinStyle: "round",
            borderDash: [5, 4],
            borderWidth: 3,
            borderColor: "grey",
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        elements: {
          point: {
            drawActiveElementsOnTop: true,
            radius: 0,
          },
        },
        scales: {
          xAxis: {
            display: false,
          },
          yAxis: {
            display: false,
            min: 0,
            max: 14,
            beginAtZero: true,
            ticks: {
              stepSize: 6,
            },
          },
        },
      }}
    />
  );
};

export default React.memo(SunChart);
