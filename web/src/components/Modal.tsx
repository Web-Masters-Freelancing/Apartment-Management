import { Box, Modal, Typography } from "@mui/material";

type CustomModalProps = {
  handleClick: () => void;
  open: boolean;
  content: React.ReactNode;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: 24,
  p: 4,
};

const CustomModal = ({ handleClick, open, content }: CustomModalProps) => {
  return (
    <Modal keepMounted open={open} onClose={handleClick}>
      <Box sx={style}>
        <Box sx={{ width: "100%", alignItems: "center" }}>{content}</Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
