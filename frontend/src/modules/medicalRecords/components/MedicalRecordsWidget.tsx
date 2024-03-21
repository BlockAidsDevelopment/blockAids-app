import React, {FC} from "react";
import {medicalRecordsApi} from "../../../api/medicalRecordsApi";
import MedicalRecordsList from "./MedicalRecordsList";
import {useAppSelector} from "../../../hooks/redux";

const MedicalRecordsWidget: FC = () => {
  const {type, authUser} = useAppSelector(state => state.authReducer);

  let fetchMedicalRecords = medicalRecordsApi.useFetchAllByUserIdQuery;
  if (type === 'specialist') {
    fetchMedicalRecords = medicalRecordsApi.useFetchAllBySpecialistIdQuery;
  }

  const {data: medicalRecords} = fetchMedicalRecords(authUser.id);

  return (
    <div className="tasks-area">
      <div className="task-create-area medical-records-area">
        <h1>Medical Records</h1>
        <MedicalRecordsList medicalRecords={medicalRecords} isVisibleDetails={true}/>
      </div>
    </div>
  )
}

export default MedicalRecordsWidget;