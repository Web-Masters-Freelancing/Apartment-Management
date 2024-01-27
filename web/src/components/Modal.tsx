import { RoomSchema } from "@/schemas";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import CustomInput, { CustomInputProps } from "./Input";
import { useHooksModal } from "./hooks/useModal";
import CustomSelect, { CustomSelectProps } from "./Select";

export type ModalSchema = CustomInputProps &
	CustomSelectProps & {
		fieldType: "textField" | "selectField";
	};

export interface CustomModalProps {
	title?: string;
	handleClick?: () => void;
	open: boolean;
	handleOnSubmit?: () => void;
	handleChange?: () => void;
	contentFields: ModalSchema[];
}

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "1px solid gray",
	boxShadow: 24,
	p: 4,
};

const CustomModal = ({
	handleClick,
	open,
	handleOnSubmit,
	contentFields,
	title,
}: CustomModalProps) => {
	useHooksModal({ contentFields });

	return (
		<>
			<Typography>Modal Works!</Typography>
			<Modal keepMounted open={open} onClose={handleClick}>
				<Box sx={style}>
					<Box sx={{ width: "100%", alignItems: "center" }}>
						<Typography>{title}</Typography>
						<Formik
							initialValues={{}}
							validationSchema={RoomSchema}
							onSubmit={() => console.log("Alejandro oletres")}
						>
							{({ isSubmitting, submitForm }) => (
								<Form>
									{contentFields.length &&
										contentFields.map((schema, key) => {
											switch (schema.fieldType) {
												case "textField":
													return (
														<CustomInput
															label={schema.label}
															name={schema.name}
															id={schema.id}
															type={schema.type}
															size={schema.size}
															key={key}
														/>
													);

												case "selectField":
													return (
														<CustomSelect
															id={schema.id}
															label={schema.label}
															options={schema.options}
															value={schema.value}
															name={schema.name}
															inputLabelId={schema.inputLabelId}
															labelId={schema.labelId}
															onChange={schema.onChange}
														/>
													);

												default:
													return <>No Content Available</>;
											}
										})}

									<Box
										sx={{
											width: "100%",
											display: "flex",
											justifyContent: "end",
											marginTop: 1,
										}}
									>
										<Button variant="contained">Save</Button>
									</Box>
								</Form>
							)}
						</Formik>
					</Box>
				</Box>
			</Modal>
		</>
	);
};

export default CustomModal;
