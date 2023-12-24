"use client";

import { styled } from "@mui/system";
import { LockOpenOutlined } from "@mui/icons-material";
import { Form, Formik, FormikHelpers } from "formik";
import { CsInput, CsButton } from "../components";
import { LoginSchema } from "../schemas";

const Container = styled("div")({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	width: "100vw",
	height: "100vh",
	background: "linear-gradient(to right bottom, #430089, #82ffa1)",
});

const FormStyle = styled("div")({
	display: "flex",
	flexDirection: "column",
	background: "#ffff",
	padding: "10px",
});

const LoginStyle = styled("div")({
	textAlign: "center",
	textTransform: "uppercase",
	padding: "20px",
});

type ILoginField = {
	username: string;
	password: string;
};

/**
 * Handle Submit here
 */
const onSubmit = async (
	values: ILoginField,
	actions: FormikHelpers<ILoginField>
) => {
	console.log("values", values);
};

const LoginPage = () => {
	return (
		<Container>
			<Formik
				initialValues={{ username: "", password: "" } as ILoginField}
				validationSchema={LoginSchema}
				onSubmit={onSubmit}
			>
				{(props) => (
					<Form>
						<FormStyle>
							<LoginStyle>
								<LockOpenOutlined />
								<h2>Login</h2>
							</LoginStyle>
							<CsInput
								label="Username"
								name="username"
								id="username"
								type="text"
							/>
							<CsInput
								label="Password"
								name="password"
								id="password"
								type="password"
							/>

							<CsButton name={"Sign In"} />
						</FormStyle>
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default LoginPage;
