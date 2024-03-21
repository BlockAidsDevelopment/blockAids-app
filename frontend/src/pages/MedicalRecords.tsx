import {Breadcrumbs, IBreadcrumb} from "../modules/breadcrumbs";
import React, {FC} from "react";
import {MedicalRecordsWidget, MedicalRecordsCreate} from "../modules/medicalRecords";

const breadcrumbs: IBreadcrumb[] = [
  {
    name: 'Home',
    link: '/',
    active: false,
  },
  {
    name: 'Medical Records',
    link: '/medical-records',
    active: true,
  },
];

const MedicalRecords: FC = () => {
  return (
    <div className="medical-records-page">
      <Breadcrumbs breadcrumbs={breadcrumbs}/>
      <div className="medical-records-add-btn">
        {/*<MedicalRecordsCreate/>*/}
      </div>
      <MedicalRecordsWidget/>
    </div>
  )
}

export default MedicalRecords;