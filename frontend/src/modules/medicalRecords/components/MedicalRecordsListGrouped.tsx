import {FC, useEffect, useState} from "react";
import {IMedicalRecord} from "../../../models/IMedicalRecord";
import MedicalRecordsItem from "./MedicalRecordsItem";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IMedicalRecordsListProps {
  medicalRecords: IMedicalRecord[];
  isVisibleDetails?: boolean;
}

const MedicalRecordsList: FC<IMedicalRecordsListProps> = ({medicalRecords, isVisibleDetails}) => {
  const [medicalRecordsGrouped, setMedicalRecordsGrouped] = useState<any>();

  useEffect(() => {
    if (medicalRecords) {
      let result = medicalRecords.reduce((x, y) => {
        (x[y.medicalRecordIndex.name] = x[y.medicalRecordIndex.name] || []).push(y);
        return x;
      }, {});

      result = Object.keys(result).map((key) => [key, result[key]]);

      setMedicalRecordsGrouped(result);
    }
  }, [medicalRecords]);

  return (
    <>
      {
        medicalRecords && medicalRecords.length === 0 &&
          <div style={{textAlign: "center"}}>There is no any medical records yet</div>
      }
      {
        medicalRecordsGrouped && medicalRecordsGrouped.map(item => (
          <Accordion className="accordion-styled">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h6><b>{item[0]}</b></h6>
            </AccordionSummary>
            <AccordionDetails>
              {
                item[1].map(record => (
                  <MedicalRecordsItem record={record} isVisibleDetails={isVisibleDetails}/>
                ))
              }
            </AccordionDetails>
          </Accordion>
        ))
      }
    </>
  )
}

export default MedicalRecordsList;
