import Link from "next/link";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  DashboardCustomize,
  BedroomChild,
  Person3,
  MonetizationOnOutlined,
  AccountBalance,
  SettingsSuggest,
  Summarize,
  ExpandLess,
  ExpandMore,
  Key,
  Bed,
} from "@mui/icons-material";
import { useHook } from "./hooks/useSideBar";

const Sidebar = () => {
  const {
    pathname,
    DASHBOARD,
    ROOM,
    TENANT,
    BILLABLES,
    SECURITY,
    REPORTS,
    CATEGORY,
    handleClick,
    collapse,
    settingsRoutes,
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

        <ListItemButton
          className={settingsRoutes(pathname) ? "active" : ""}
          onClick={handleClick}
        >
          <SettingsSuggest />
          <ListItemText primary="Settings" />
          {collapse ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={collapse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href={CATEGORY}>
              <ListItemButton
                className={pathname === CATEGORY ? "active" : ""}
                sx={{ pl: 4 }}
              >
                <Bed />
                <ListItemText primary={CATEGORY} />
              </ListItemButton>
            </Link>
            <Link href={SECURITY}>
              <ListItemButton
                className={pathname === SECURITY ? "active" : ""}
                sx={{ pl: 4 }}
              >
                <Key />
                <ListItemText primary={SECURITY} />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

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
