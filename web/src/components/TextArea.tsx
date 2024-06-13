import * as React from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { blue, grey } from "@mui/material/colors";
import { TextareaAutosizeProps } from "@mui/material";
import { useField } from "formik";
import { ErrorWrapper } from "./Input";
const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);
const CustomTextArea = ({ autoFocus, ...props }: TextareaAutosizeProps) => {
  const [field, meta] = useField(props as Required<TextareaAutosizeProps>);

  return (
    <>
      <Textarea
        sx={{ width: "100%", marginY: 1 }}
        autoFocus={true}
        {...props}
        {...field}
      />
      {meta.touched && meta.error && <ErrorWrapper>*{meta.error}</ErrorWrapper>}
    </>
  );
};

export default CustomTextArea;
