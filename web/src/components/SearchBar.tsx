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

const actionsWrapper: SxProps<Theme> = {
  display: "flex",
  width: "50%",
  justifyContent: "end",
  gap: 2,
};

/**
 * Search bar properties
 * extend {@link TableActions} props
 */
interface SearchBarProps<T extends Maybe<AnyObject>> extends TableActions {
  handleSubmit: (values: T, helpers: FormikHelpers<T>) => void;
}

const SearchBar = ({ handleSubmit, actions }: SearchBarProps<any>) => {
  return (
    <Box sx={searchWrapper}>
      <Box sx={{ width: "50%" }}>
        <Formik initialValues={{ keyword: "" }} onSubmit={handleSubmit}>
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Box
                sx={{
                  display: "flex",
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
      <Box sx={actionsWrapper}>
        {actions?.length &&
          actions.map((action, key) => {
            const { onClick, handleClick, ...props } = action;
            return (
              <Button {...props} key={key} onClick={() => handleClick()}>
                {props.name}
              </Button>
            );
          })}
      </Box>
    </Box>
  );
};

export default SearchBar;
