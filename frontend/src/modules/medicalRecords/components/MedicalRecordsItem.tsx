import React, {FC} from "react";
import {IMedicalRecord} from "../../../models/IMedicalRecord";
import "../styles/MedicalRecords.scss";
import moment from "moment"
import DeleteIcon from '@mui/icons-material/Delete';
import {medicalRecordsApi} from "../../../api/medicalRecordsApi";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import {useAppSelector} from "../../../hooks/redux";
import {isMobile} from "react-device-detect";

interface IMedicalRecordsUpdateItemIProps {
  record: IMedicalRecord;
  isVisibleDetails: boolean;
}

const MedicalRecordsItem: FC<IMedicalRecordsUpdateItemIProps> = ({record, isVisibleDetails}) => {
  const {type} = useAppSelector(state => state.authReducer);
  const [deleteMedicalRecord] = medicalRecordsApi.useDeleteMutation();
  const [displayRemoveDialog, setDisplayRemoveDialog] = React.useState(false);

  const removeMedicalRecord = async () => {
    try {
      await deleteMedicalRecord(record.id).unwrap();
      toggleDisplayRemoveDialog();
    } catch (e) {
      console.log(e)
    }
  }

  const toggleDisplayRemoveDialog = () => {
    setDisplayRemoveDialog(!displayRemoveDialog);
  };

  return (
    <div  className={!isVisibleDetails ? "right-align medical-records-item" : "medical-records-item"}>
      <section>
        <p>
          {
            record.medicalRecordIndex.name.length > 15 && isMobile ?
              <b>
                {record.medicalRecordIndex.name.replace(/\b(\S{1,4})\S*/g, '$1').replace(/ /g, '. ')}:
              </b> :
              <b>
                {record.medicalRecordIndex.name}:
              </b>
          } {record.value}
          <i style={{fontSize: "12px"}}> {record.medicalRecordIndex.unit !== "-" ? record.medicalRecordIndex.unit : ''}</i>
        </p>
        {/*<p><small>{moment(record.created_at).fromNow()}</small></p>*/}
        <p><small>{moment(record.created_at).format("MMMM Do YYYY, h:mm:ss a")}</small></p>
      </section>

      {
        isVisibleDetails &&
          <>
              <section className="task-section">
                  <p><b>Task: </b>
                    {
                      record.task.name.length > 15 && isMobile ?
                        <>
                          {record.task.name.replace(/\b(\S{1,4})\S*/g, '$1').replace(/ /g, '. ')}:
                        </> :
                        <>
                          {record.task.name}
                        </>
                    }
                  </p>
              </section>
              <section className="signed-section">
                {
                  type === "user" ? <p><b>Specialist:</b> {record.specialist.name}</p> :
                    <p><b>Patient:</b> {record.user.name}</p>
                }
              </section>
          </>
      }

      <section className="delete-section">
        <span onClick={toggleDisplayRemoveDialog}><DeleteIcon/></span>
        <Dialog
          open={displayRemoveDialog}
          onClose={toggleDisplayRemoveDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{textAlign: "center"}}>
              Are you sure? <br/>
              This medical record will not be deleted restored.
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{justifyContent: 'space-around'}}>
            <Button onClick={removeMedicalRecord} variant="contained"
                    style={{backgroundColor: '#13C2BD', color: '#FFF', border: '1px solid #13C2BD'}}>Confirm</Button>
            <Button onClick={toggleDisplayRemoveDialog} variant="outlined"
                    style={{backgroundColor: '#FFF', color: '#13C2BD', border: '1px solid #13C2BD'}}>Cancel</Button>
          </DialogActions> <br/>
        </Dialog>
      </section>
    </div>
  )
}

export default MedicalRecordsItem;
