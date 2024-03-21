import * as React from 'react';
import {FC} from "react";
import "../styles/MedicalRecords.scss";
import {medicalRecordIndexesApi} from "../../../api/medicalRecordIndexesApi";
import TextTypeRecordFrom from "./medicalRecordFrorms/TextTypeRecordFrom";
import NumberTypeRecordFrom from "./medicalRecordFrorms/NumberTypeRecordForm";
import SelectTypeRecordFrom from "./medicalRecordFrorms/SelectTypeRecordFrom";
import {ITask} from "../../../models/ITask";

interface IMedicalRecordsCreateProps {
  task: ITask;
}

const MedicalRecordsCreate: FC<IMedicalRecordsCreateProps> = ({task}) => {
  const {data: medicalRecordIndexes} = medicalRecordIndexesApi.useFetchAllByTaskTypeIdQuery(task.taskType.id);

  return (
    <>
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
    </>
  );
}

export default MedicalRecordsCreate;