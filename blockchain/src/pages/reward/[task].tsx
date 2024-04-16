import useNearStore from "@/stories/useNearStore";
import ConnectWallet from "@/components/ConnectWallet";
import SendReward from "@/components/SendReward";
import {Box, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import {ITask} from "@/models/ITask";


const RewardTask = () => {
  const {wallet, account} = useNearStore();
  const [task, setTask] = useState<ITask>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(' http://localhost:4000/api/tasks/1', {cache: 'no-store'});
      const json = await data.json();
      setTask(json);
      return json;
    }

    // call the function
    const result = fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  return (
    <>
      {
        !account && <ConnectWallet/>
      }
      {
        account &&
          <>
              <Grid container spacing={{xs: 2, md: 3}}>
                  <Grid item lg={8}>
                      <Box className="content-part">
                        {
                          task &&  <SendReward task={task}/>
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
