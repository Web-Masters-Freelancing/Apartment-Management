"use client";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";
import WrapperLayout from "@/app/wrapper.layout";
import { Form, Formik } from "formik";
import CustomInput from "@/components/Input";
import CustomModal from "@/components/Modal";
import { RoomSchema } from "@/schemas";
import { useHooks } from "./hooks";
import CustomTable from "@/components/Table";

const Room = () => {
  const {
    fields,
    handleSubmit,
    open,
    toggleModal,
    initialValues,
    handleSearch,
    dataSource,
    columnSchema,
    tableActions,
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
        title="CREATE ROOMS"
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
        <CardContent>
          <Typography
            style={{ fontWeight: "bold" }}
            variant="h6"
            component="div"
          >
            Room list!
          </Typography>
          <CustomTable
            columns={columnSchema}
            dataSource={dataSource}
            actions={tableActions}
          />
        </CardContent>
      </Card>
    </WrapperLayout>
  );
};

export default Room;
