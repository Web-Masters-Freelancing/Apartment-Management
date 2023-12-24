"use client";

import { styled } from "@mui/system";
import { LockOpenOutlined } from "@mui/icons-material";
import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../components/Input";
import { LoginSchema } from "../schemas";
import { Button } from "@mui/material";

const Container = styled("div")({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	width: "100vw",
	height: "100vh",
	background: "linear-gradient(to right bottom, #430089, #82ffa1)",
});

const FormContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	background: "#ffff",
	padding: "10px",
});

const LoginContainer = styled("div")({
	textAlign: "center",
	textTransform: "uppercase",
	padding: "20px",
});

type LoginFormValues = {
	username: string;
	password: string;
};

/**
 * Handle Submit here
 */
const onSubmit = async (
	values: LoginFormValues,
	actions: FormikHelpers<LoginFormValues>
) => {
	console.log("values", values);
};

const LoginPage = () => {
	return (
		<Container>
			<Formik
				initialValues={{ username: "", password: "" } as LoginFormValues}
				validationSchema={LoginSchema}
				onSubmit={onSubmit}
			>
				{(props) => (
					<Form>
						<FormContainer>
							<LoginContainer>
								<LockOpenOutlined />
								<h2>Login</h2>
							</LoginContainer>
							<CustomInput
								label="Username"
								name="username"
								id="username"
								type="text"
							/>
							<CustomInput
								label="Password"
								name="password"
								id="password"
								type="password"
							/>

							<div style={{ paddingTop: "6px", width: "100%" }}>
								<Button style={{ width: "100%" }} variant="contained">
									Sign In
								</Button>
							</div>
						</FormContainer>
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default LoginPage;
