import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { useField } from "formik";

/**
 * Error style
 */
const ErrorStyle = styled("div")({
	color: "#fc8181",
	fontSize: 10,
});
/**
 * Custom Input Props
 * Reactive Input built by formik third party library
 */
export interface CustomInputProps {
	label?: string;
	name?: string;
	type?: "text" | "password" | "number";
	placeholder?: string;
	variant?: "outlined";
	margin?: "dense" | "normal" | "none";
	id?: string;
	size?: "small" | "medium";
}
/**
 * Custom Input component
 */
const CustomInput = ({
	variant = "outlined",
	margin = "dense",
	size = "medium",
	...props
}: CustomInputProps) => {
	const [field, meta] = useField(props as Required<CustomInputProps>);

	return (
		<>
			<TextField
				size={size}
				{...field}
				{...props}
				variant={variant}
				margin={margin}
				className={meta.touched && meta.error ? "input-error" : ""}
				sx={{ width: "100%" }}
			/>
			{meta.touched && meta.error && <ErrorStyle> *{meta.error} </ErrorStyle>}
		</>
	);
};

export default CustomInput;