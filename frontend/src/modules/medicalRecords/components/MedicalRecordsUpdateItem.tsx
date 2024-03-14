import React, {FC} from "react";
import {IMedicalRecord} from "../../../models/IMedicalRecord";
import "../styles/MedicalRecords.scss";
import moment from "moment"
import DeleteIcon from '@mui/icons-material/Delete';
import {medicalRecordsApi} from "../../../api/medicalRecordsApi";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText} from "@mui/material";

interface IMedicalRecordsUpdateItemIProps {
  record: IMedicalRecord;
}

const MedicalRecordsUpdateItem: FC<IMedicalRecordsUpdateItemIProps> = ({record}) => {
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
    <div className="medical-records-item">
      <section>
        <p><b>{record.medicalRecordIndex.name}</b>: {record.value}</p>
        <p><small>{moment(record.created_at).fromNow()}</small></p>
      </section>
      <section>
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

export default MedicalRecordsUpdateItem;