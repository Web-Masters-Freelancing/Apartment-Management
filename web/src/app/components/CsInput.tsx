import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { useField } from "formik";

/**
 * Custom Input Props
 * Reactive Input built by formik third party library
 */
type CustomInputProps = {
	label?: string;
	name?: string;
	type?: "text" | "password";
	placeholder?: string;
	variant?: "outlined";
	margin?: "dense";
	id?: string;
};

/**
 * Error style
 */
const ErrorStyle = styled("div")({
	color: "#fc8181",
	fontSize: 10,
});

/**
 * Custom Input component
 */
const CsInput = ({
	variant = "outlined",
	margin = "dense",
	...props
}: CustomInputProps) => {
	const [field, meta] = useField(props as Required<CustomInputProps>);

	return (
		<>
			<TextField
				{...field}
				{...props}
				variant={variant}
				margin={margin}
				className={meta.touched && meta.error ? "input-error" : ""}
			/>
			{meta.touched && meta.error && (
				<ErrorStyle className="error"> *{meta.error} </ErrorStyle>
			)}
		</>
	);
};

export default CsInput;
