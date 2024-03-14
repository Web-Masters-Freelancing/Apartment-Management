import {
  Box,
  Modal,
  Button,
  Theme,
  SxProps,
  Typography,
  ModalProps,
  TextareaAutosizeProps,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { AnyObject, Maybe, ObjectSchema } from "yup";
import Input from "./Input";
import TextArea from "./TextArea";
import Select, { SelectFieldProps } from "./Select";
import Table, { CustomTableProps } from "@/components/Table";
import {
  Field,
  InputFieldProps,
  useHook as useModalHook,
} from "./hooks/useModal";
import { memo } from "react";

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
 * If modal will render a form
 * @initialValues form initial values
 * @validationSchema this is optional, yup schema for form fields
 * @handleSubmit method that will be triggered when the form is submitted
 * @fields Array of {@link Field} prop
 */
interface ModalFormProps<T extends Maybe<AnyObject>> {
  initialValues: T;
  validationSchema?: ObjectSchema<T>;
  handleSubmit: (values: T, helpers: FormikHelpers<T>) => void;
  fields: Field<InputFieldProps | SelectFieldProps | TextareaAutosizeProps>[];
}

/**
 * If modal will render a list
 *
 */
interface ModalListProps extends CustomTableProps {}

/**
 * Modal properties
 * @handleClose a function that handles the closing of the modal
 * @open controls the modal state (open/close)
 */
interface Props<T extends Maybe<AnyObject>> extends Partial<ModalProps> {
  handleClose: () => void;
  formProps?: ModalFormProps<T>;
  listProps?: ModalListProps;
  open: boolean;
  title: string;
  btnName?: string;
  modalFor?: "form" | "list";
  width?: number;
}

const CustomModal = ({
  handleClose,
  open,
  formProps,
  listProps,
  title,
  btnName = "Save",
  modalFor = "form",
  width,
  ...props
}: Props<any>) => {
  const { isInputField, isSelectField, isTextAreaField } = useModalHook();

  return (
    <Modal keepMounted open={open} onClose={handleClose} {...props}>
      <Box
        sx={{
          ...contentWrapperStyle,
          width,
        }}
      >
        <Typography>{title}</Typography>
        {modalFor === "form" && formProps ? (
          <Box sx={{ width: "100%", alignItems: "center" }}>
            <Formik
              initialValues={formProps.initialValues}
              validationSchema={formProps.validationSchema}
              onSubmit={formProps.handleSubmit}
              enableReinitialize
            >
              {({ submitForm, isSubmitting, setFieldValue }) => {
                return (
                  <Form>
                    {formProps.fields.map((field, index) => {
                      if (isInputField(field)) {
                        return (
                          <Input
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

                      if (isTextAreaField(field)) {
                        return (
                          <TextArea
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
                        {btnName}
                      </Button>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        ) : modalFor === "list" && listProps ? (
          <Box sx={{ width: "100%", alignItems: "center" }}>
            <Table
              columns={listProps.columns}
              dataSource={listProps.dataSource}
              tableHeader={listProps.tableHeader}
              cellActions={listProps.cellActions}
              headerActions={listProps.headerActions}
            />
          </Box>
        ) : null}
      </Box>
    </Modal>
  );
};

export default memo(CustomModal);
