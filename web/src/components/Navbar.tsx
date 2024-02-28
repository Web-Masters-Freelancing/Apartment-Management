import { AppBar, Box, Toolbar, Typography, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHook } from "./hooks/useNavbar";

const Navbar = () => {
  const { logOutUser } = useHook();

  return (
    <AppBar sx={{ background: "#000", position: "sticky" }}>
      <Toolbar
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Whitehouse Apartment Management</Typography>
        <Tooltip
          style={{ margin: 5 }}
          onClick={logOutUser}
          title="Log out"
          arrow
        >
          <LogoutIcon
            sx={{
              ":hover": { color: "blue", cursor: "pointer" },
            }}
          />
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
