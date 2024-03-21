import MyButton from "./MyButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import {FC, ReactNode, useState} from "react";

interface IMyModalProps {
  title: string;
  btnTitle: string;
  btnIcon: string;
  children: ReactNode;
}

const MyModal: FC<IMyModalProps> = ({title, btnTitle, btnIcon, children}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MyButton onClick={handleOpen} icon={btnIcon}>{btnTitle}</MyButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box className="form-modal">
          <div className="form-modal-header">
            <h2 className="child-modal-title">{title}</h2>
            <span onClick={handleClose}><CloseIcon/></span>
          </div>
          {children}
        </Box>
      </Modal>
    </>
  )
}

export default MyModal;