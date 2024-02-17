import Link from "next/link";
import { Box, List, ListItemButton, ListItemText, Drawer } from "@mui/material";
import {
  DashboardCustomize,
  BedroomChild,
  Person3,
  MonetizationOnOutlined,
  AccountBalance,
  SettingsSuggest,
  Summarize,
} from "@mui/icons-material";
import { useHook } from "./hooks/useSideBar";

const Sidebar = () => {
  const {
    pathname,
    DASHBOARD,
    ROOM,
    TENANT,
    BILLABLES,
    TRANSACTIONS,
    SETTINGS,
    REPORTS,
  } = useHook();

  return (
    <Box
      sx={{
        color: "#8C8B8A",
        width: "180px",
        height: "100vh",
        overflowY: "auto",
        borderRight: "1.5px #E7E6E3 solid",
        position: "sticky",
      }}
    >
      <List sx={{ width: "100%", textTransform: "capitalize" }} component="nav">
        <Link href={DASHBOARD}>
          <ListItemButton className={pathname === DASHBOARD ? "active" : ""}>
            <DashboardCustomize />
            <ListItemText primary={DASHBOARD} />
          </ListItemButton>
        </Link>

        <Link href={ROOM}>
          <ListItemButton className={pathname === ROOM ? "active" : ""}>
            <BedroomChild />
            <ListItemText primary={ROOM} />
          </ListItemButton>
        </Link>

        <Link href={TENANT}>
          <ListItemButton className={pathname === TENANT ? "active" : ""}>
            <Person3 />
            <ListItemText primary={TENANT} />
          </ListItemButton>
        </Link>

        <Link href={BILLABLES}>
          <ListItemButton className={pathname === BILLABLES ? "active" : ""}>
            <MonetizationOnOutlined />
            <ListItemText primary={BILLABLES} />
          </ListItemButton>
        </Link>

        <Link href={TRANSACTIONS}>
          <ListItemButton className={pathname === TRANSACTIONS ? "active" : ""}>
            <AccountBalance />
            <ListItemText primary={TRANSACTIONS} />
          </ListItemButton>
        </Link>

        <Link href={SETTINGS}>
          <ListItemButton className={pathname === SETTINGS ? "active" : ""}>
            <SettingsSuggest />
            <ListItemText primary={SETTINGS} />
          </ListItemButton>
        </Link>

        <Link href={REPORTS}>
          <ListItemButton className={pathname === REPORTS ? "active" : ""}>
            <Summarize />
            <ListItemText primary={REPORTS} />
          </ListItemButton>
        </Link>
      </List>
    </Box>
  );
};

export default Sidebar;
