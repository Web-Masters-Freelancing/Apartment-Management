"use client";
import { Box, Button, Card, CardHeader } from "@mui/material";
import WrapperLayout from "../wrapper.layout";
import { Form, Formik } from "formik";
import CustomInput from "../../components/Input";
import CustomModal from "../../components/Modal";
import { useHooks } from "./hooks";

const Room = () => {
	const { open, toggleModal, handleRoomSubmit, modalSchema } = useHooks();

	return (
		<WrapperLayout>
			<CustomModal
				title="Create Rooms"
				open={open}
				handleClick={toggleModal}
				contentFields={modalSchema}
			/>
			<Box
				sx={{
					display: "flex",
					width: "100%",
				}}
			>
				<Box sx={{ width: "50%" }}>
					<Formik initialValues={{ search: "" }} onSubmit={handleRoomSubmit}>
						{(props) => (
							<Form>
								<Box
									sx={{
										display: "flex",
									}}
								>
									<CustomInput
										label="Search something"
										name="search"
										id="search"
										type="text"
										size="small"
										margin="none"
									/>
									<Box>
										<Button
											style={{ marginInlineStart: 4 }}
											variant="contained"
										>
											Search
										</Button>
									</Box>
								</Box>
							</Form>
						)}
					</Formik>
				</Box>
				<Box
					sx={{
						display: "flex",
						width: "50%",
						justifyContent: "end",
					}}
				>
					<Button variant="contained" onClick={toggleModal}>
						Add Rooms
					</Button>
				</Box>
			</Box>
			<Card sx={{ marginTop: 1 }}>
				<CardHeader>Rooms list!</CardHeader>
			</Card>
		</WrapperLayout>
	);
};

export default Room;
