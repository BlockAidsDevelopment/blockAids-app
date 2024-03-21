import {FC} from "react";
import {IMedicalRecord} from "../../../models/IMedicalRecord";
import MedicalRecordsItem from "./MedicalRecordsItem";

interface IMedicalRecordsListProps {
  medicalRecords: IMedicalRecord[];
  isVisibleDetails?: boolean;
}

const MedicalRecordsList: FC<IMedicalRecordsListProps> = ({medicalRecords, isVisibleDetails}) => {
  return (
    <>
      {
        medicalRecords && medicalRecords.length === 0 &&
          <div style={{textAlign: "center"}}>There is no any medical records yet</div>
      }
      {
        medicalRecords && medicalRecords.map(record => (
          <MedicalRecordsItem record={record} isVisibleDetails={isVisibleDetails}/>
        ))
      }
    </>
  )
}

export default MedicalRecordsList;