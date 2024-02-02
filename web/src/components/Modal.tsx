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
	const { initialValues, formGroup } = useHooksModal({ contentFields });

	return (
		<>
			<Modal keepMounted open={open} onClose={handleClick}>
				<Box sx={style}>
					<Box sx={{ width: "100%", alignItems: "center" }}>
						<Typography sx={{ paddingBottom: 2, textTransform: "uppercase" }}>
							{title}
						</Typography>
						<Formik
							initialValues={initialValues}
							validationSchema={formGroup}
							onSubmit={() => console.log("Alejandro oletres")}
						>
							{({ isSubmitting, submitForm }) => (
								<Form>
									{contentFields?.length &&
										contentFields.map((field, key) => {
											switch (field.fieldType) {
												case "textField":
													return (
														<CustomInput
															label={field.label}
															name={field.name}
															id={field.id}
															type={field.type}
															size={field.size}
															key={key}
														/>
													);

												case "selectField":
													return (
														<CustomSelect
															id={field.id}
															label={field.label}
															options={field.options}
															value={field.value}
															name={field.name}
															inputLabelId={field.inputLabelId}
															labelId={field.labelId}
															onChange={field.onChange}
															key={key}
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
										<Button
											variant="contained"
											disabled={isSubmitting}
											onClick={submitForm}
										>
											Save
										</Button>
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
