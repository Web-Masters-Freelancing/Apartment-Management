import Link from "next/link";
import { usePathname } from "next/navigation";
import { EPathName } from "../utils/enums";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";

const Sidebar = () => {
	// Url Name
	const urlname = usePathname();
	// Path Name
	const pathname = urlname.replace("/", "").trim();

	return (
		<Box
			sx={{
				color: "#8C8B8A",
				width: "180px",
				height: "100vh",
				overflowY: "auto",
				borderRight: "1.5px #E7E6E3 solid",
			}}
		>
			<List sx={{ width: "100%", textTransform: "capitalize" }} component="nav">
				<Link href={EPathName.DASHBOARD}>
					<ListItemButton
						className={pathname === EPathName.DASHBOARD ? "active" : ""}
					>
						<ListItemText primary={EPathName.DASHBOARD} />
					</ListItemButton>
				</Link>

				<Link href={EPathName.ROOM}>
					<ListItemButton
						className={pathname === EPathName.ROOM ? "active" : ""}
					>
						<ListItemText primary={EPathName.ROOM} />
					</ListItemButton>
				</Link>
			</List>
		</Box>
	);
};

export default Sidebar;
