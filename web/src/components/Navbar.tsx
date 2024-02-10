import { AppBar, Box, Toolbar, Typography, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  return (
    <div>
      <AppBar sx={{ background: "#000" }} position="static">
        <Toolbar
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Whitehouse Apartment Management</Typography>
          <Tooltip title="Log out" arrow>
            <LogoutIcon
              sx={{
                ":hover": { color: "blue", cursor: "pointer" },
              }}
            />
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
