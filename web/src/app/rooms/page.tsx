"use client";
import { Box, Button, Card, CardHeader } from "@mui/material";
import WrapperLayout from "@/app/wrapper.layout";
import { Form, Formik } from "formik";
import CustomInput from "@/components/Input";
import CustomModal from "@/components/Modal";
import { RoomSchema } from "@/schemas";
import { useHooks } from "./hooks";

const Room = () => {
  const {
    fields,
    handleSubmit,
    open,
    toggleModal,
    initialValues,
    handleSearch,
  } = useHooks();

  return (
    <WrapperLayout>
      <CustomModal
        open={open}
        fields={fields}
        handleSubmit={handleSubmit}
        handleClose={toggleModal}
        validationSchema={RoomSchema}
        initialValues={initialValues}
        key={"add-room-modal"}
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <Box sx={{ width: "50%" }}>
          <Formik initialValues={{ keyword: "" }} onSubmit={handleSearch}>
            {(props) => (
              <Form>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <CustomInput
                    label="Search something"
                    name="text"
                    id="text"
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
