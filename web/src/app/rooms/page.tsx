"use client";
import { Box, Button, Card, CardHeader } from "@mui/material";
import WrapperLayout from "../wrapper.layout";
import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../components/Input";
import CustomModal from "../../components/Modal";
import CustomSelect from "../../components/Select";
import { useState } from "react";
import { Typography } from "@mui/material";
import { RoomSchema } from "../../schemas";
import { useHooks } from "./hooks";

/**
 * Sub Component
 */
const ModalContent = () => {
  const { handleChange, handleCreateRoomSubmission, type, menuItems } =
    useHooks();

  return (
    <Box sx={{ width: "100%" }}>
      <Typography>CREATE ROOMS</Typography>
      <Formik
        initialValues={{ room: "", type: "", description: "", amount: 0 }}
        validationSchema={RoomSchema}
        onSubmit={handleCreateRoomSubmission}
      >
        {(props) => (
          <Form>
            <CustomInput
              label="Room Name"
              name="room"
              id="room"
              type="text"
              margin="dense"
            />

            <CustomSelect
              id="type"
              label="Room type"
              menuItem={menuItems}
              value={type}
              name="type"
              inputLabelId="type"
              labelId="type"
              onChange={handleChange}
              margin="dense"
            />
            <CustomInput
              label="Description"
              name="description"
              id="description"
              type="text"
              margin="dense"
            />
            <CustomInput
              label="Amount"
              name="amount"
              id="amount"
              type="number"
              margin="dense"
            />

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
  );
};

type SearchValue = { search: string };

const Room = () => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen((state) => !state);

  const onSubmit = async (
    values: SearchValue,
    actions: FormikHelpers<SearchValue>
  ) => {
    console.log("values", values);
  };

  return (
    <>
      <WrapperLayout>
        <CustomModal
          open={open}
          handleClick={toggleModal}
          content={<ModalContent />}
        />
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Formik initialValues={{ search: "" }} onSubmit={onSubmit}>
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
    </>
  );
};

export default Room;
