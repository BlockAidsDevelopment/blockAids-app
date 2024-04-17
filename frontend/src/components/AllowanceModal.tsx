import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useEffect, useState} from "react";
import MyButton from "../ui/MyButton";
import ReportIcon from '@mui/icons-material/Report';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {usersApi} from "../api/usersApi";
import {overwriteAuthUser} from "../store/reducers/AuthSlice";
import {specialistsApi} from "../api/specialistsApi";

const AllowanceModal = () => {
  const dispatch = useAppDispatch();
  const {authUser, type} = useAppSelector(state => state.authReducer)
  const {data: currentUser} = usersApi.useFetchUserByIdQuery(authUser.id);
  const {data: currentSpecialist} = specialistsApi.useFetchSpecialistByIdQuery(authUser.id);
  const [open, setOpen] = useState(true);
  const [blockchainUrl, setBlockchainUrl] = useState(undefined);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (currentUser) {
      if (type === "user") {
        dispatch(overwriteAuthUser(currentUser));
      }
    }
    if (currentSpecialist) {
      if (type === "specialist") {
        dispatch(overwriteAuthUser(currentSpecialist));
      }
    }
  }, [currentUser, currentSpecialist])

  useEffect(() => {
    const encryptedData = btoa(`${authUser.email}|${authUser.id}|${type}`);
    setBlockchainUrl(`${process.env.REACT_APP_BLOCKCHAIN_URL}?moderate=${encryptedData}`)
  }, []);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="allowance-modal">
        <Typography id="modal-modal-title" variant="h6" component="h2" display={"flex"} alignItems={"flex-start"}>
          <ReportIcon style={{marginTop: "5px"}}/>
          <span>Your account is not moderated yet.</span>
        </Typography>
        {
          !authUser.accountId &&
            <>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    Please follow the steps below to request moderation
                </Typography>
                <Typography id="modal-modal-buttons" sx={{mt: 2}} className="modal-buttons-area">
                    <MyButton onClick={handleClose}>Remind later</MyButton>
                    <a href={blockchainUrl}><MyButton className="light-btn">Continue</MyButton></a>
                </Typography>
            </>
        }
        {
          authUser.accountId &&
            <>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    You have applied for moderation! Confirmation will come soon.
                </Typography>
                <Typography id="modal-modal-buttons" sx={{mt: 2}} className="modal-buttons-area">
                    <MyButton onClick={handleClose}>Close</MyButton>
                </Typography>
            </>
        }
      </Box>
    </Modal>
  );
}

export default AllowanceModal;
