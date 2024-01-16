import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import React from "react";

type Columns = {
	id: string;
	label: string;
	minWidth: number;
	align: string;
};

type CustomTableProps = {
	columns: Columns[];
};

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
