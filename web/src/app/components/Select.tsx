import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectProps,
} from "@mui/material";

export type MenuItems = {
	value?: string | number;
	key?: string;
};

type CustomSelectProps = SelectProps & {
	menuItem?: MenuItems[];
	inputLabelId: string;
};

const CustomSelect = ({
	menuItem,
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
				{menuItem?.length &&
					menuItem.map((item, index) => {
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
