import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectProps,
} from "@mui/material";

export type OptionSelect = {
	value?: string | number;
	key?: string;
};

export interface CustomSelectProps extends SelectProps {
	options?: OptionSelect[];
	inputLabelId: string;
}

const CustomSelect = ({
	options,
	inputLabelId,
	...props
}: CustomSelectProps) => {
	return (
		<FormControl
			variant="outlined"
			sx={{ width: "100%" }}
			margin={props.margin}
		>
			<InputLabel id={inputLabelId}> {props.label} </InputLabel>
			<Select {...props}>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				{options?.length &&
					options.map((item, index) => {
						return (
							<MenuItem key={index} value={item.key}>
								{item.value}
							</MenuItem>
						);
					})}
			</Select>
		</FormControl>
	);
};

export default CustomSelect;
