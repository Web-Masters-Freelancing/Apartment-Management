"use client";
import { Box, SxProps } from "@mui/material";
import WrapperLayout from "@/app/wrapper.layout";
import {
  BedroomChildTwoTone,
  MonetizationOnOutlined,
  Person3,
  DateRange,
  Paid,
} from "@mui/icons-material";
import React from "react";
import CustomChart from "@/components/Chart";
import { useHook } from "./hooks";
import { Theme } from "@emotion/react";
import SummaryCard from "@/components/Card";
import moment from "moment";
import CustomTable from "@/components/Table";

const CardStyle: SxProps<Theme> = {
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  wordSpacing: 5,
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
    role,
    billable,
    columns,
    dataSource,
    currentIncome,
  } = useHook();

  return (
    <WrapperLayout>
      <Box sx={{ width: "100%" }}>
        <Box sx={CardStyle}>
          <SummaryCard
            icon={<BedroomChildTwoTone fontSize="large" color="info" />}
            title={role === "ADMIN" ? "Available Rooms" : "Room Number"}
            value={
              role === "ADMIN"
                ? availableRooms?.length ?? 0
                : billable?.room?.roomNumber ?? 0
            }
          />
          <SummaryCard
            icon={
              role === "ADMIN" ? (
                <Person3 fontSize="large" color="disabled" />
              ) : (
                <DateRange fontSize="large" color="disabled" />
              )
            }
            title={role === "ADMIN" ? "Total Tenant" : "Due date"}
            value={
              role === "ADMIN"
                ? users?.length ?? 0
                : moment(billable?.dueDate).format("YYYY/MM/DD")
            }
          />
          <SummaryCard
            icon={<MonetizationOnOutlined fontSize="large" color="warning" />}
            title={role === "ADMIN" ? "Total Billable" : "Amount Due"}
            value={role === "ADMIN" ? totalBillables : billable?.amountDue ?? 0}
          />

          {role === "ADMIN" && (
            <SummaryCard
              icon={<Paid fontSize="large" color="error" />}
              title={"Current Total Income"}
              value={currentIncome}
            />
          )}
        </Box>

        {role === "ADMIN" ? (
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
        ) : (
          <Box sx={{ paddingX: 2 }}>
            <CustomTable
              tableHeader="Payments history"
              columns={columns}
              dataSource={dataSource ?? []}
            />
          </Box>
        )}
      </Box>
    </WrapperLayout>
  );
};

export default DashBoard;
