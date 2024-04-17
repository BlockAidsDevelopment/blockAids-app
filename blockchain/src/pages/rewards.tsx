import {Grid, Box} from "@mui/material";
import ConnectWallet from "@/components/ConnectWallet";
import Button from "@mui/material/Button";
import SendReward from "@/components/SendReward";

const Rewards = () => {
  return (
    <>
      <Grid container spacing={{xs: 2, md: 3}}>
        <Grid item lg={8}>
          <Box className="content-part">
            {/*<SendReward/>*/}
          </Box>
        </Grid>
        <Grid item lg={4}>
          <Box className="content-part">
            <ConnectWallet/>
          </Box>
        </Grid>
      </Grid>
    </>

  )
}

export default Rewards;
