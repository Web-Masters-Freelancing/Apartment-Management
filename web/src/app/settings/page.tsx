"use client";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Button,
  SxProps,
} from "@mui/material";
import WrapperLayout from "@/app/wrapper.layout";
import { Key, ExpandMore, ExpandLess } from "@mui/icons-material";
import { useHook } from "./hooks";
import CustomInput from "@/components/Input";
import { Form, Formik } from "formik";
import { SecurityFormSchema } from "@/schemas";
import { Theme } from "@emotion/react";

const formWrapper: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  gap: 1,
};

const SettingsPage = () => {
  const { handleSubmit, handleClick, open, initialValues } = useHook();
  return (
    <WrapperLayout>
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Account Security
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Take actions to make your account more secure.
          </Typography>
          <List>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <Key />
              </ListItemIcon>
              <ListItemText primary="Change your password" />
              {open ? <ExpandMore /> : <ExpandLess />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={formWrapper}>
                <Box
                  sx={{
                    width: "40%",
                  }}
                >
                  <Formik
                    initialValues={initialValues}
                    validationSchema={SecurityFormSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ submitForm, isSubmitting }) => (
                      <Form>
                        <CustomInput
                          label="Current password"
                          name="currentPassword"
                          id="currentPassword"
                          type="password"
                          margin="dense"
                        />

                        <CustomInput
                          label="New password"
                          name="newPassword"
                          id="newPassword"
                          type="password"
                          margin="dense"
                        />

                        <CustomInput
                          label="Confirm password"
                          name="confirmPassword"
                          id="confirmPassword"
                          type="password"
                          margin="dense"
                        />

                        <Box
                          sx={{
                            display: "flex",
                            paddingTop: 1,
                            justifyContent: "end",
                          }}
                        >
                          <Button
                            variant="contained"
                            onSubmit={submitForm}
                            disabled={isSubmitting}
                            type="submit"
                          >
                            Save changes
                          </Button>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Box>
            </Collapse>
          </List>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </WrapperLayout>
  );
};

export default SettingsPage;
