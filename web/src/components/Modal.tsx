import { Box, Modal, Button, Theme, SxProps } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { AnyObject, Maybe, ObjectSchema } from "yup";
import Input from "./Input";
import Select, { SelectFieldProps } from "./Select";
import {
  Field,
  InputFieldProps,
  useHook as useModalHook,
} from "./hooks/useModal";

const contentWrapperStyle: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "background.paper",
  border: "1px solid gray",
  boxShadow: "24",
  p: 4,
};

const saveButtonWrapper: SxProps<Theme> = {
  width: "100%",
  display: "flex",
  justifyContent: "end",
  marginTop: 1,
};

/**
 * Modal properties
 * @handleClose a function that handles the closing of the modal
 * @open controls the modal state (open/close)
 * @initialValues form initial values
 * @validationSchema this is optional, yup schema for form fields
 * @handleSubmit method that will be triggered when the form is submitted
 * @fields Array of {@link Field} prop
 */
interface ModalProps<T extends Maybe<AnyObject>> {
  handleClose: () => void;
  open: boolean;
  initialValues: T;
  validationSchema?: ObjectSchema<T>;
  handleSubmit: (values: T, helpers: FormikHelpers<T>) => void;
  fields: Field<InputFieldProps | SelectFieldProps>[];
}

const CustomModal = ({
  handleClose,
  open,
  fields,
  initialValues,
  validationSchema,
  handleSubmit,
}: ModalProps<any>) => {
  const { isInputField, isSelectField } = useModalHook();

  return (
    <Modal keepMounted open={open} onClose={handleClose}>
      <Box sx={contentWrapperStyle}>
        <Box sx={{ width: "100%", alignItems: "center" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ submitForm, isSubmitting, setFieldValue }) => (
              <Form>
                {fields.map((field, index) => {
                  if (isInputField(field)) {
                    return <Input {...field.fieldProps} key={index} />;
                  }

                  if (isSelectField(field)) {
                    return (
                      <Select
                        {...field.fieldProps}
                        onChange={(e) => {
                          if (field.fieldProps.name) {
                            setFieldValue(
                              field.fieldProps.name,
                              e.target.value
                            );
                          }
                        }}
                        key={index}
                      />
                    );
                  }
                })}
                <Box sx={saveButtonWrapper}>
                  <Button
                    disabled={isSubmitting}
                    variant="contained"
                    onClick={submitForm}
                  >
                    Save
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
