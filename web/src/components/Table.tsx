import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  ButtonProps,
  Button,
  TableCellProps,
} from "@mui/material";
import React, { memo } from "react";
import { useHook } from "./hooks/useTable";
import { Typography } from "@mui/material";

/**
 * extends {@link ButtonProps}
 */
export interface ActionButtonProps<T> extends ButtonProps {
  handleClick: (element?: T) => void;
}

export interface TableActions {
  actions?: ActionButtonProps<any>[];
}

/**
 * Column properties
 * @key is from the generic type and represent as a value to be displayed
 * @label the label of each columns
 * @align the alignment of each cells
 * @format this type was able to manipulate numbers format
 */
export interface Column<T> extends TableActions {
  key: keyof T;
  label: string;
  minWidth?: number;
  align?: TableCellProps["align"];
  format?: (value: number) => string;
}

/**
 * CustomTable properties
 * @datasource the data array list or content in the table
 * @columns which defined specific display in table list
 */
export interface CustomTableProps extends TableActions {
  tableName: string;
  dataSource: any[];
  columns: Column<any>[];
}

const CustomTable = ({
  tableName,
  dataSource,
  columns,
  actions,
}: CustomTableProps) => {
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    useHook();

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 2 }}>
      <Typography
        style={{
          fontWeight: "bold",
          paddingLeft: 15,
          paddingTop: 10,
        }}
        variant="h6"
        component="div"
      >
        {tableName}
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.length &&
                columns.map((column, index) => {
                  return (
                    <TableCell
                      key={index}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth ?? 80,
                        textTransform: "capitalize",
                        fontWeight: "bold",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  );
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSource?.length &&
              dataSource
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns?.length &&
                        columns.map((column, cellIndex) => {
                          if (column.key !== "actions") {
                            return (
                              <TableCell key={cellIndex} align={column.align}>
                                {column?.format &&
                                typeof row[column.key] === "number"
                                  ? column.format(row[column.key])
                                  : row[column.key]}
                              </TableCell>
                            );
                          } else {
                            return (
                              actions?.length && (
                                <TableCell
                                  key={cellIndex}
                                  align="center"
                                  sx={{
                                    display: "flex",
                                    width: "100%",
                                    gap: 1,
                                  }}
                                >
                                  {actions.map((action, actionIndex) => {
                                    const { onClick, handleClick, ...props } =
                                      action;
                                    return (
                                      <Button
                                        key={actionIndex}
                                        {...props}
                                        onClick={() => handleClick(row)}
                                      >
                                        {props.name}
                                      </Button>
                                    );
                                  })}
                                </TableCell>
                              )
                            );
                          }
                        })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataSource?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  );
};

export default memo(CustomTable);
