import React, {FC} from "react";
import Brightness1Icon from "@mui/icons-material/Brightness1";

const MedicalRecordsWidget: FC = () => {
  return (
    <div className="medical-records-wrapper">
      <div className="medical-record medical-record-heading">
        <div>Medical Record</div>
        <div>Last Index</div>
        <div>Max Allowed</div>
        <div>Specialist</div>
        <div>Patient</div>
        <div>Date</div>
      </div>

      <div className="medical-record">
        <div>CD4 cell level</div>
        <div className="icon-contained"><Brightness1Icon color="error"/> 56</div>
        <div>117</div>
        <div>Dr. Brew</div>
        <div>John Smith</div>
        <div className="medical-record-date">Wed Mar 06 2024</div>
      </div>
      <div className="medical-record">
        <div>CD4 cell level</div>
        <div className="icon-contained"><Brightness1Icon color="success"/> 115</div>
        <div> 117</div>
        <div>Dr. Brew</div>
        <div>John Smith</div>
        <div className="medical-record-date">Wed Mar 06 2024</div>
      </div>
      <div className="medical-record">
        <div>CD4 cell level</div>
        <div className="icon-contained"><Brightness1Icon color="info"/> 99</div>
        <div> 117</div>
        <div>Dr. Brew</div>
        <div>John Smith</div>
        <div className="medical-record-date">Wed Mar 06 2024</div>
      </div>
      <div className="medical-record">
        <div>CD4 cell level</div>
        <div className="icon-contained"><Brightness1Icon color="secondary"/> 200</div>
        <div> 117</div>
        <div>Dr. Brew</div>
        <div>John Smith</div>
        <div className="medical-record-date">Wed Mar 06 2024</div>
      </div>
    </div>
  )
}

export default MedicalRecordsWidget;