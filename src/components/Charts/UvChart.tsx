import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(ArcElement);

interface UvChartProps {
  uvIndex: number | undefined;
}

function getUvData(uv: number) {
  const arr: number[] = [];
  const first = (uv / 12) * 100;
  const second = 100 - first;
  arr.push(first, second);
  return arr;
}

const UvChart: React.FC<UvChartProps> = (props) => {
  return (
    <Doughnut
      datasetIdKey="id"
      data={{
        labels: ["0", "2", "4", "6", "8", "10", "12"],
        datasets: [
          {
            label: "My First Dataset",
            data: getUvData(props.uvIndex!),
            backgroundColor: ["rgba(49, 218, 255, 0.3)", "rgba(0, 0, 0, 0.1)"],
            borderRadius: 0,
          },
          {
            label: "My First Dataset",
            data: getUvData(props.uvIndex!),
            backgroundColor: ["rgba(49, 218, 255, 0.3)", "rgba(0, 0, 0, 0.1)"],
            borderRadius: 0,
          },
        ],
      }}
      options={{
        offset: 2,
        rotation: -90,
        circumference: 180,
        cutout: 40,
        maintainAspectRatio: false,
      }}
    />
  );
};

export default React.memo(UvChart);
