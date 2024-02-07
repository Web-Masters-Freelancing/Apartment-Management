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

/**
 * Button properties
 * ActionButtonProps extend to {@link ButtonProps} mui default props
 * @handleClick is to handle the click event and the param element is the values or object of each rows
 * @T represent as the generic type of the param either object or array
 */
export interface ActionButtonProps<T> extends ButtonProps {
	handleClick: (element: T) => void;
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
	align?: "right";
	format?: (value: number) => string;
}

/**
 * CustomTable properties
 * @datasource the data array list or content in the table
 * @columns which defined specific display in table list
 */
export interface CustomTableProps extends TableActions {
	dataSource: any[];
	columns: Column<any>[];
}

/**
 * @Component
 * @param {datasource columns actions}
 * @returns Table component
 */
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

export default CustomTable;
