import {FC} from "react";
import {IMedicalRecord} from "../../../models/IMedicalRecord";
import "../styles/MedicalRecords.scss";
import {MedicalRecordsCreate} from "../index";
import {ITask} from "../../../models/ITask";
import MedicalRecordsUpdateItem from "./MedicalRecordsUpdateItem";

interface IMedicalRecordsProps {
  medicalRecords: IMedicalRecord[];
  task: ITask;
}

const MedicalRecordsUpdateList: FC<IMedicalRecordsProps> = ({medicalRecords, task}) => {
  return (
    <>
      <div className="tasks-area">
        <div className="task-create-area medical-records-area">
          <div className="medical-records-heading">
            <h4>Medical Records:</h4>
            {
              task && <MedicalRecordsCreate task={task}/>
            }
          </div>
          {
            medicalRecords && medicalRecords.length === 0 &&
              <div style={{textAlign: "center"}}>There is no any medical records yet</div>
          }
          {
            medicalRecords && medicalRecords.map(record => (
              <MedicalRecordsUpdateItem record={record}/>
            ))
          }
        </div>
      </div>

    </>
  )
}

export default MedicalRecordsUpdateList;