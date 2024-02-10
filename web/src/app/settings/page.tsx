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
} from "@mui/material";
import WrapperLayout from "@/app/wrapper.layout";
import { Key, ExpandMore, ExpandLess } from "@mui/icons-material";
import { useHook } from "./hooks";
import CustomInput from "@/components/Input";
import { Form, Formik } from "formik";

const SettingsPage = () => {
  const { handleSubmit, handleClick, open } = useHook();
  return (
    <WrapperLayout>
      <Card variant="outlined">
        <CardMedia
          sx={{ height: 140 }}
          component="img"
          image="./../assets/images.png"
        />
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  gap: 1,
                }}
              >
                <Formik
                  initialValues={{ password: "", newPassword: "" }}
                  onSubmit={handleSubmit}
                >
                  {({ submitForm, isSubmitting }) => (
                    <Form>
                      <CustomInput
                        label="Current password"
                        name="password"
                        id="password"
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
                        >
                          Save changes
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
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
