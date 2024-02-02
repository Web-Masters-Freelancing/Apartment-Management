"use client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";

const WrapperLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box sx={{ overflow: "hidden", height: "100vh" }}>
			<Navbar />
			<Box sx={{ display: "flex", justifyContent: "start" }}>
				<Sidebar />
				<Box
					sx={{
						display: "flex",
						width: "100%",
						backgroundColor: "ButtonHighlight",
					}}
				>
					<Box sx={{ padding: "10px", width: "100%" }}>{children}</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default WrapperLayout;
