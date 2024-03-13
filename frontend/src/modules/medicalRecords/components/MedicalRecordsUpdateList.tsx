import {FC} from "react";
import {IMedicalRecord} from "../../../models/IMedicalRecord";
import "../styles/MedicalRecords.scss";
import {MedicalRecordsCreate} from "../index";

interface IMedicalRecordsProps {
  medicalRecords: IMedicalRecord[];
  taskTypeId: number | null;
}

const MedicalRecordsUpdateList: FC<IMedicalRecordsProps> = ({medicalRecords, taskTypeId}) => {
  return (
    <>
      <div className="tasks-area">
        <div className="task-create-area medical-records-area">
          <div className="medical-records-heading">
            <h4>Medical Records:</h4>
            {
              taskTypeId &&  <MedicalRecordsCreate taskTypeId={taskTypeId}/>
            }
          </div>
          {
            medicalRecords && medicalRecords.map(record => (
              <>{record.id}</>
            ))
          }
        </div>
      </div>

    </>
  )
}

export default MedicalRecordsUpdateList;