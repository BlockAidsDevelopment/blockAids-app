import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {FC, useState} from "react";
import MyButton from "../../../ui/MyButton";
import "../styles/MedicalRecords.scss";
import CloseIcon from '@mui/icons-material/Close';
import {medicalRecordIndexesApi} from "../../../api/medicalRecordIndexesApi";
import TextTypeRecordFrom from "./medicalRecordFrorms/TextTypeRecordFrom";
import NumberTypeRecordFrom from "./medicalRecordFrorms/NumberTypeRecordForm";
import SelectTypeRecordFrom from "./medicalRecordFrorms/SelectTypeRecordFrom";
import {ITask} from "../../../models/ITask";

interface IMedicalRecordsCreateProps {
  task: ITask;
}

const MedicalRecordsCreateModal: FC<IMedicalRecordsCreateProps> = ({task}) => {
  const {data: medicalRecordIndexes} = medicalRecordIndexesApi.useFetchAllByTaskTypeIdQuery(task.taskType.id);
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
        <Box sx={{width: 800}} className="form-modal">
          <div className="form-modal-header">
            <h2 className="child-modal-title">Add new medical record</h2>
            <span onClick={handleClose}><CloseIcon/></span>
          </div>
          <div className="form-modal-body">
            {
              medicalRecordIndexes &&
              medicalRecordIndexes.map((medicalRecordIndex) => {
                if (medicalRecordIndex.type === "text") {
                  return <TextTypeRecordFrom medicalRecordIndex={medicalRecordIndex} task={task}
                                             specialist={task.specialist}
                                             user={task.user}/>
                }
                if (medicalRecordIndex.type === "number") {
                  return <NumberTypeRecordFrom medicalRecordIndex={medicalRecordIndex} task={task}
                                               specialist={task.specialist}
                                               user={task.user}/>
                }
                if (medicalRecordIndex.type === "select") {
                  return <SelectTypeRecordFrom medicalRecordIndex={medicalRecordIndex} task={task}
                                               specialist={task.specialist}
                                               user={task.user}/>
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