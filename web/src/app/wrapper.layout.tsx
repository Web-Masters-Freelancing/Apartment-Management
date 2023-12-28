"use client";
import styled from "@emotion/styled";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const Wrapper = styled("div")({
	display: "flex",
	justifyContent: "start",
});

const Container = styled("div")({
	overflow: "hidden",
	height: "100vh",
});

const Content = styled("div")({
	display: "flex",
	width: "100%",
	backgroundColor: "ButtonHighlight",
});

const WrapperLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Container>
			<Navbar />
			<Wrapper>
				<Sidebar />
				<Content>{children}</Content>
			</Wrapper>
		</Container>
	);
};

export default WrapperLayout;
