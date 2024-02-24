"use client";
import { Box, Typography, Card, styled, SxProps } from "@mui/material";
import WrapperLayout from "@/app/wrapper.layout";
import {
  BedroomChildTwoTone,
  MonetizationOnOutlined,
  Person3,
} from "@mui/icons-material";
import React from "react";
import CustomChart from "@/components/Chart";
import { useHook } from "./hooks";
import { Theme } from "@emotion/react";

type SummaryCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
};
const SummaryCard = (props: SummaryCardProps) => {
  return (
    <Card sx={{ padding: "8px", width: "30%", boxShadow: 9 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        {props.icon}
        <Box>
          <Typography> {props.title} </Typography>
          <Typography variant="subtitle1"> {props.value} </Typography>
        </Box>
      </Box>
    </Card>
  );
};

const CardStyle: SxProps<Theme> = {
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  wordSpacing: 5,
  paddingBottom: 2,
};

const DashBoard = () => {
  const { availableRoomsDatasets, labels, availableRooms } = useHook();

  return (
    <WrapperLayout>
      <Box sx={{ width: "100%" }}>
        <Box sx={CardStyle}>
          <SummaryCard
            icon={<BedroomChildTwoTone fontSize="large" color="info" />}
            title="Available Rooms"
            value={availableRooms?.length ?? 0}
          />
          <SummaryCard
            icon={<Person3 fontSize="large" color="disabled" />}
            title="Total Tenant"
            value={456.0}
          />
          <SummaryCard
            icon={<MonetizationOnOutlined fontSize="large" color="warning" />}
            title="Total Billable"
            value={456.0}
          />
        </Box>

        <Box sx={CardStyle}>
          <CustomChart
            title="Availables Statistic"
            type="bar"
            datasets={availableRoomsDatasets}
            labels={labels}
          />
          <CustomChart
            title="Occupied Rooms"
            type="scatter"
            datasets={availableRoomsDatasets}
            labels={labels}
          />
          <CustomChart
            title=""
            type="pie"
            datasets={availableRoomsDatasets}
            labels={labels}
          />
        </Box>
      </Box>
    </WrapperLayout>
  );
};

export default DashBoard;
