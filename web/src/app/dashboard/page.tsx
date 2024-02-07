"use client";
import { Box, Typography, Card } from "@mui/material";
import WrapperLayout from "@/app/wrapper.layout";
import {
  BedroomChildTwoTone,
  MonetizationOnOutlined,
  Person3,
} from "@mui/icons-material";

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

const DashBoard = () => {
  return (
    <WrapperLayout>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          wordSpacing: 5,
        }}
      >
        <SummaryCard
          icon={<BedroomChildTwoTone fontSize="large" color="info" />}
          title="Available Rooms"
          value={456.0}
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
    </WrapperLayout>
  );
};

export default DashBoard;
