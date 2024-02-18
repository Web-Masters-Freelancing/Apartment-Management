import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

/**
 * @open dialog state
 * @toggleDialog function that closes/opens the dialog
 * @title dialog title
 * @contentText dialog content text
 * @handleSubmit function that is trigerred once the save button is clicked from the dialog box
 * @showCloseBtn a state to check wether to show the cancel button or not, by default, it is shown
 */
interface DialogBoxProps {
  open: boolean;
  toggleDialog: () => void;
  title: string;
  contentText: string;
  handleSubmit: () => void;
  showCloseBtn?: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = ({
  contentText,
  handleSubmit,
  open,
  title,
  toggleDialog,
  showCloseBtn = true,
}: DialogBoxProps) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={toggleDialog}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {showCloseBtn && <Button onClick={toggleDialog}>Cancel</Button>}
          <Button onClick={handleSubmit}>OK</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogBox;
