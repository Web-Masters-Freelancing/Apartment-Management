import styled from "@emotion/styled";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EPathName } from "../utils/enums";

const Container = styled("div")({
	display: "flex",
	width: "180px",
	color: "#8C8B8A",
	borderRight: "1.5px #E7E6E3 solid",
	height: "100vh",
	overflowY: "auto",
});

const UlContainer = styled("ul")({
	listStyleType: "none",
	margin: 0,
	width: "100%",
});

const LiContainer = styled("li")({
	padding: "15px",
	margin: 0,
	cursor: "pointer",
	":hover": {
		backgroundColor: "#E7E6E3",
	},
});
const Sidebar = () => {
	const pathname = usePathname();

	return (
		<Container>
			<UlContainer>
				<LiContainer
					className={pathname === EPathName.DASHBOARD ? "active" : ""}
				>
					<Link href={EPathName.DASHBOARD}>Dashboard</Link>
				</LiContainer>
				<LiContainer
					className={pathname === EPathName.ROOM ? "active" : ""}
				>
					<Link href={EPathName.ROOM}>Room</Link>
				</LiContainer>
			</UlContainer>
		</Container>
	);
};

export default Sidebar;
