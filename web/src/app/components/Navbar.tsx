import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
	return (
		<div>
			<AppBar sx={{ background: "#000" }} position="static">
				<Toolbar>
					<Typography variant="h6">Whitehouse Apartment Management</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
