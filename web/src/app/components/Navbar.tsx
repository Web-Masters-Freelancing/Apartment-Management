import styled from "@emotion/styled";

const Container = styled("div")({
	width: "100%",
	backgroundColor: "#000",
	color: "#fff",
	padding: "20px",
	letterSpacing: 2,
	fontSize: 20,
});

const Navbar = () => {
	return (
		<Container>
			<span>Whitehouse Apartment Management</span>
		</Container>
	);
};

export default Navbar;
