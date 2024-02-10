import { Box, Button, SxProps, Theme } from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import React from "react";
import CustomInput from "./Input";
import { AnyObject, Maybe } from "yup";
import { TableActions } from "./Table";

const searchWrapper: SxProps<Theme> = {
  display: "flex",
  width: "100%",
};

/**
 * Search bar properties
 * extend {@link TableActions} props
 */
interface SearchBarProps<T extends Maybe<AnyObject>> extends TableActions {
  handleSubmit: (values: T, helpers: FormikHelpers<T>) => void;
}

const SearchBar = ({ handleSubmit }: SearchBarProps<any>) => {
  return (
    <Box sx={searchWrapper}>
      <Box sx={{ width: "50%" }}>
        <Formik initialValues={{ keyword: "" }} onSubmit={handleSubmit}>
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <CustomInput
                  label="Search something"
                  name="keyword"
                  id="keyword"
                  type="text"
                  size="small"
                  margin="none"
                />
                <Box>
                  <Button
                    disabled={isSubmitting}
                    onClick={submitForm}
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
    </Box>
  );
};

export default SearchBar;
