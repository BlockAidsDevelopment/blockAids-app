import {FC} from "react";
import {IMedicalRecord} from "../../../models/IMedicalRecord";

interface IMedicalRecordsProps {
  medicalRecords: IMedicalRecord[];
}

const MedicalRecordsUpdateList: FC<IMedicalRecordsProps> = ({medicalRecords}) => {
  return (
    <>
      {
        medicalRecords && medicalRecords.map(record => (
          <>{record.id}</>
        ))
      }
    </>
  )
}

export default MedicalRecordsUpdateList;