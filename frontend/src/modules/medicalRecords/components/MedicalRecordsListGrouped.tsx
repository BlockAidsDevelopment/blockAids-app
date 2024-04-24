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
    let groupedMedicalRecords = [];
    if (medicalRecords) {
      for (let i = 0; i < medicalRecords.length; i++) {
        if (!groupedMedicalRecords[medicalRecords[i].medicalRecordIndex.name]) {
          groupedMedicalRecords[medicalRecords[i].medicalRecordIndex.name] = [];
        }

        groupedMedicalRecords[medicalRecords[i].medicalRecordIndex.name][medicalRecords[i].value] = medicalRecords[i];
      }

      const result = Object.keys(groupedMedicalRecords).map((key) => [key, groupedMedicalRecords[key]]);

      result.map(e => {
        console.log(e[1])
        // e[1].map(w => {
        //   // console.log(w);
        // })
      })

      console.log(result);
      setMedicalRecordsGrouped(result);

      console.log(typeof groupedMedicalRecords)
    }
  }, [medicalRecords]);

  return (
    <>
      {
        medicalRecords && medicalRecords.length === 0 &&
          <div style={{textAlign: "center"}}>There is no any medical records yet</div>
      }
      {/*{*/}
      {/*  medicalRecords && medicalRecords.map(record => (*/}
      {/*    <MedicalRecordsItem record={record} isVisibleDetails={isVisibleDetails}/>*/}
      {/*  ))*/}
      {/*}*/}

      {
        medicalRecordsGrouped && medicalRecordsGrouped.map(item => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {item[0]}
            </AccordionSummary>
            <AccordionDetails>
              {JSON.stringify(item)}
              {/*{*/}
              {/*  item[1].map(record => (*/}
              {/*    <MedicalRecordsItem record={record} isVisibleDetails={isVisibleDetails}/>*/}
              {/*  ))*/}
              {/*}*/}
            </AccordionDetails>
          </Accordion>

        ))
      }


    </>
  )
}

export default MedicalRecordsList;
