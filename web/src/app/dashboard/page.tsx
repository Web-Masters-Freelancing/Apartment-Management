"use client";
import { Box, SxProps } from "@mui/material";
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
import SummaryCard from "@/components/Card";

const CardStyle: SxProps<Theme> = {
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  paddingBottom: 2,
};

const DashBoard = () => {
  const {
    availableRoomsDatasets,
    labels,
    availableRooms,
    occupiedUsersDatasets,
    billablesCardTitle,
    monthlyReceivables,
    users,
    totalBillables,
  } = useHook();

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
            value={users?.length ?? 0}
          />
          <SummaryCard
            icon={<MonetizationOnOutlined fontSize="large" color="warning" />}
            title="Total Billable"
            value={totalBillables}
          />
        </Box>

        <Box sx={CardStyle}>
          <CustomChart
            title="Availables Rooms Statistics"
            type="bar"
            datasets={availableRoomsDatasets}
            labels={labels}
          />
          <CustomChart
            title="Occupied Rooms"
            type="line"
            datasets={occupiedUsersDatasets}
            labels={labels}
          />
          <CustomChart
            title={billablesCardTitle}
            type="doughnut"
            datasets={monthlyReceivables}
            labels={labels}
          />
        </Box>
      </Box>
    </WrapperLayout>
  );
};

export default DashBoard;
