import Link from "next/link";
import { usePathname } from "next/navigation";
import { EProtectedPage } from "../utils/enums";
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
				<Link href={EProtectedPage.DASHBOARD}>
					<ListItemButton
						className={pathname === EProtectedPage.DASHBOARD ? "active" : ""}
					>
						<DashboardCustomize />
						<ListItemText primary={EProtectedPage.DASHBOARD} />
					</ListItemButton>
				</Link>

				<Link href={EProtectedPage.ROOM}>
					<ListItemButton
						className={pathname === EProtectedPage.ROOM ? "active" : ""}
					>
						<BedroomChild />
						<ListItemText primary={EProtectedPage.ROOM} />
					</ListItemButton>
				</Link>

				<Link href={EProtectedPage.TENANT}>
					<ListItemButton
						className={pathname === EProtectedPage.TENANT ? "active" : ""}
					>
						<Person3 />
						<ListItemText primary={EProtectedPage.TENANT} />
					</ListItemButton>
				</Link>

				<Link href={EProtectedPage.BILLABLES}>
					<ListItemButton
						className={pathname === EProtectedPage.BILLABLES ? "active" : ""}
					>
						<MonetizationOnOutlined />
						<ListItemText primary={EProtectedPage.BILLABLES} />
					</ListItemButton>
				</Link>

				<Link href={EProtectedPage.TRANSACTIONS}>
					<ListItemButton
						className={pathname === EProtectedPage.TRANSACTIONS ? "active" : ""}
					>
						<AccountBalance />
						<ListItemText primary={EProtectedPage.TRANSACTIONS} />
					</ListItemButton>
				</Link>

				<Link href={EProtectedPage.SETTINGS}>
					<ListItemButton
						className={pathname === EProtectedPage.SETTINGS ? "active" : ""}
					>
						<SettingsSuggest />
						<ListItemText primary={EProtectedPage.SETTINGS} />
					</ListItemButton>
				</Link>

				<Link href={EProtectedPage.REPORTS}>
					<ListItemButton
						className={pathname === EProtectedPage.REPORTS ? "active" : ""}
					>
						<Summarize />
						<ListItemText primary={EProtectedPage.REPORTS} />
					</ListItemButton>
				</Link>
			</List>
		</Box>
	);
};

export default Sidebar;
