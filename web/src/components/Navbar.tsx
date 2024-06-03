import { AppBar, Box, Toolbar, Typography, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHook } from "./hooks/useNavbar";

const Navbar = () => {
  const { logOutUser, name, role } = useHook();

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
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Typography sx={{ paddingRight: 2 }} variant="subtitle2">
            Good day! {name}
          </Typography>
          <Tooltip
            style={{ margin: 0 }}
            onClick={logOutUser}
            title={`Log out as ${role}`}
            arrow
          >
            <LogoutIcon
              sx={{
                ":hover": { color: "blue", cursor: "pointer" },
              }}
            />
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
