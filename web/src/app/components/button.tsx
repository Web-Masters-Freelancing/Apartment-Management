import { Button, ButtonOwnProps } from "@mui/material";

/**
 * Custom Button Props
 */
const CsButton = ({
	name,
	variant = "contained",
	...props
}: ButtonOwnProps & { name: string }) => {
	return (
		<Button variant={variant} {...props}>
			{name}
		</Button>
	);
};

export default CsButton;
