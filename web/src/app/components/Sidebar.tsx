import Link from "next/link";
import { usePathname } from "next/navigation";
import { EPathName } from "../utils/enums";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import {
	DashboardCustomize,
	BedroomChild,
	Person3,
	MonetizationOnOutlined,
	AccountBalance,
	SettingsSuggest,
	Summarize,
} from "@mui/icons-material";

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
						<DashboardCustomize />
						<ListItemText primary={EPathName.DASHBOARD} />
					</ListItemButton>
				</Link>

				<Link href={EPathName.ROOM}>
					<ListItemButton
						className={pathname === EPathName.ROOM ? "active" : ""}
					>
						<BedroomChild />
						<ListItemText primary={EPathName.ROOM} />
					</ListItemButton>
				</Link>

				<Link href={EPathName.TENANT}>
					<ListItemButton
						className={pathname === EPathName.TENANT ? "active" : ""}
					>
						<Person3 />
						<ListItemText primary={EPathName.TENANT} />
					</ListItemButton>
				</Link>

				<Link href={EPathName.BILLABLES}>
					<ListItemButton
						className={pathname === EPathName.BILLABLES ? "active" : ""}
					>
						<MonetizationOnOutlined />
						<ListItemText primary={EPathName.BILLABLES} />
					</ListItemButton>
				</Link>

				<Link href={EPathName.TRANSACTIONS}>
					<ListItemButton
						className={pathname === EPathName.TRANSACTIONS ? "active" : ""}
					>
						<AccountBalance />
						<ListItemText primary={EPathName.TRANSACTIONS} />
					</ListItemButton>
				</Link>

				<Link href={EPathName.SETTINGS}>
					<ListItemButton
						className={pathname === EPathName.SETTINGS ? "active" : ""}
					>
						<SettingsSuggest />
						<ListItemText primary={EPathName.SETTINGS} />
					</ListItemButton>
				</Link>

				<Link href={EPathName.REPORTS}>
					<ListItemButton
						className={pathname === EPathName.REPORTS ? "active" : ""}
					>
						<Summarize />
						<ListItemText primary={EPathName.REPORTS} />
					</ListItemButton>
				</Link>
			</List>
		</Box>
	);
};

export default Sidebar;
