import React from "react";
import { ChartProps, Chart as DynamicChart } from "react-chartjs-2";

import {
  CategoryScale,
  Chart,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  ChartData,
  RadialLinearScale,
} from "chart.js";
import { useHook } from "./hooks/useChart";
import { Card, Typography } from "@mui/material";

Chart.register(
  ArcElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale
);

interface ChartType extends Pick<ChartProps, "type"> {}

export interface CustomChartProps extends ChartType, ChartData {
  title: string;
}

const CustomChart = ({ title, type, labels, datasets }: CustomChartProps) => {
  const { data } = useHook({ datasets, labels } as CustomChartProps);
  return (
    <>
      <Card style={{ height: "fit-content", padding: 10 }}>
        <Typography sx={{ fontSize: 12, color: "#5c5e61" }}>{title}</Typography>
        <DynamicChart
          style={{ width: "100%", height: "fit-content" }}
          type={type}
          data={data}
          options={{
            responsive: true,
            hover: {
              mode: "index",
              intersect: false,
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                mode: "index",
                intersect: false,
                enabled: true,
                position: "average",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleColor: "#fff",
                titleFont: { weight: "bold" },
                callbacks: {
                  labelColor: function (context) {
                    return {
                      borderColor: "rgb(0, 0, 255)",
                      backgroundColor: "rgb(255, 0, 0)",
                      borderWidth: 2,
                      borderDash: [2, 2],
                      borderRadius: 2,
                    };
                  },
                  labelTextColor: function (context) {
                    return "#543453";
                  },
                },
              },
            },
          }}
        />
      </Card>
    </>
  );
};

export default CustomChart;
