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
	Box,
} from "@mui/material";
import React from "react";
import { useHook } from "./hooks/useTable";

export interface ActionButtonProps extends ButtonProps {}

export interface TableActions {
	actions?: ActionButtonProps[];
}

export interface Column<T> extends TableActions {
	key: keyof T;
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
}

export interface CustomTableProps extends TableActions {
	dataSource: any[];
	columns: Column<any>[];
}

const CustomTable = ({ dataSource, columns, actions }: CustomTableProps) => {
	const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
		useHook();

	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
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
																	{actions.map((props, actionIndex) => {
																		return (
																			<Button key={actionIndex} {...props}>
																				{props.name}
																			</Button>
																		);
																	})}
																</TableCell>
															)
														);
													}
												})}

											{/* */}
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

export default CustomTable;
