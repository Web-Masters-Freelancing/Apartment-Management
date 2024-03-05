import React from "react";
import { ChartProps, Chart as DynamicChart } from "react-chartjs-2";

import {
  CategoryScale,
  Chart,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  ChartData,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useHook } from "./hooks/useChart";
import { Box, Card, Typography } from "@mui/material";

Chart.register(
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Tooltip,
  Legend
);

interface ChartType extends Pick<ChartProps, "type"> {}

export interface CustomChartProps extends ChartType, ChartData {
  title: string;
}

const CustomChart = ({ title, type, labels, datasets }: CustomChartProps) => {
  const { data, label } = useHook({ datasets, labels } as CustomChartProps);
  return (
    <Box sx={{ height: "fit-content", marginX: 2, width: "100%" }}>
      <Card sx={{ width: "100%", padding: 2 }}>
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
                display: !!label,
              },
            },
          }}
        />
      </Card>
    </Box>
  );
};

export default CustomChart;
