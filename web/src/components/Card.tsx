import { Card, Box, Typography } from "@mui/material";

export type SummaryCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
};

const SummaryCard = (props: SummaryCardProps) => {
  return (
    <Card sx={{ padding: "8px", width: "100%", boxShadow: 9, marginX: 2 }}>
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

export default SummaryCard;
