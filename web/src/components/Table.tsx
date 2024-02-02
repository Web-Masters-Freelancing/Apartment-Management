import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const CustomTable = () => {
  return (
    <Table sx={{ width: "100%" }}>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default CustomTable;
