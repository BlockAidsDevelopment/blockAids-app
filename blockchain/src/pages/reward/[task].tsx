import useNearStore from "@/stories/useNearStore";
import ConnectWallet from "@/components/ConnectWallet";
import SendReward from "@/components/SendReward";
import {Box, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import {ITask} from "@/models/ITask";
import {useRouter} from "next/router";
import {IMedicalRecord} from "@/models/IMedicalRecord";

const RewardTask = () => {
  const router = useRouter();
  const {account} = useNearStore();
  const [task, setTask] = useState<ITask | null>();
  const [taskFetchError, setTaskFetchError] = useState<boolean>(false);
  const [medicalRecords, setMedicalRecords] = useState<IMedicalRecord[] | null | undefined>();
  const [medicalRecordsFetchError, setMedicalRecordsFetchError] = useState<boolean>(false);

  useEffect(() => {
    if (!router.isReady) return;
    const taskId = router.query.task;
    setTaskFetchError(false);
    fetchTask(taskId).catch(console.error);
    fetchMedicalRecords(taskId).catch(console.error);
  }, [router.isReady])

  const fetchTask = async (taskId: string | string[] | undefined) => {
    const data = await fetch(`http://localhost:4000/api/tasks/${taskId}`, {cache: 'no-store'});
    const json = await data.json();
    if (json.statusCode === 404) {
      setTaskFetchError(true);
      throw new Error(json.message);
    } else {
      setTask(json);
      return json;
    }
  }

  const fetchMedicalRecords = async (taskId: string | string[] | undefined) => {
    const data = await fetch(`http://localhost:4000/api/medical-records/task/${taskId}`, {cache: 'no-store'});
    const json = await data.json();
    if (json.statusCode === 404) {
      setMedicalRecordsFetchError(true);
      throw new Error(json.message);
    } else {
      setMedicalRecords(json);
      return json;
    }
  }

  return (
    <>
      {!account && <ConnectWallet/>}
      {
        account &&
          <>
              <Grid container spacing={{xs: 2, md: 3}}>
                  <Grid item lg={8}>
                      <Box className="content-part">
                        {
                          task && <SendReward task={task} medicalRecords={medicalRecords}/>
                        }
                        {
                          taskFetchError && <p>Task not found!</p>
                        }
                      </Box>
                  </Grid>
                  <Grid item lg={4}>
                      <Box className="content-part">
                          <ConnectWallet/>
                      </Box>
                  </Grid>
              </Grid>
          </>
      }
    </>
  )
}

export default RewardTask;
