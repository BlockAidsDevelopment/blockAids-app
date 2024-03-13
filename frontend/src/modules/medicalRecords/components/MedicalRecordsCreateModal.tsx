import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {FC, useState} from "react";
import MyButton from "../../../ui/MyButton";
import "../styles/MedicalRecords.scss";
import MyInput from "../../../ui/MyInput";
import typeTaskIcon from "../../../ui/assets/typeTaskIcon.svg";
import {medicalRecordIndexesApi} from "../../../api/medicalRecordIndexesApi";
import TextTypeRecordFrom from "./medicalRecordFrorms/TextTypeRecordFrom";
import NumberTypeRecordFrom from "./medicalRecordFrorms/NumberTypeRecordForm";
import SelectTypeRecordFrom from "./medicalRecordFrorms/SelectTypeRecordFrom";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
};

interface IMedicalRecordsCreateProps {
  taskTypeId: number | null;
}

const MedicalRecordsCreateModal: FC<IMedicalRecordsCreateProps> = ({taskTypeId}) => {
  const {data: medicalRecordIndexes} = medicalRecordIndexesApi.useFetchAllByTaskTypeIdQuery(taskTypeId);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MyButton onClick={handleOpen} icon="/images/icons/add-icon.svg">Add new record</MyButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{...style, width: 800}} className="form-modal">
          <h2 className="child-modal-title">Add new medical record</h2>
          <div className="form-modal-body">
            {
              medicalRecordIndexes &&
              medicalRecordIndexes.map((medicalRecordIndex) => {
                if (medicalRecordIndex.type === "text") {
                 return <TextTypeRecordFrom medicalRecordIndex={medicalRecordIndex}/>
                }
                if (medicalRecordIndex.type === "number") {
                  return <NumberTypeRecordFrom medicalRecordIndex={medicalRecordIndex}/>
                }
                if (medicalRecordIndex.type === "select") {
                  return <SelectTypeRecordFrom medicalRecordIndex={medicalRecordIndex}/>
                }
              })
            }
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default MedicalRecordsCreateModal;