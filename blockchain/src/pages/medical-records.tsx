import ConnectWallet from "@/components/ConnectWallet";
import {Box, Grid, TextField} from "@mui/material";
import useNearStore from "@/stories/useNearStore";
import Button from "@mui/material/Button";
import React, {useState} from "react";

const MedicalRecords = () => {
  const {account} = useNearStore();
  const [arweaveLink, setArweaveLink] = useState<string>();
  const [walletId, setWalletId] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [responseJSON, setResponseJSON] = useState<any>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setResponseJSON(null);
    try {
      const encodedURI = encodeURIComponent(arweaveLink ? arweaveLink : "");
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blockchain/decrypted/${encodedURI}/${walletId}`)
      const data = await response.json();
      console.log(response);
      if (response.status === 200) {
        setResponseJSON(data);
      } else{
        setError(true);
      }
      console.log(data);
    } catch (e) {
      setError(true);
      console.log(e);
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
                          <div className="rewards-section">
                              <h2>Check Medical Records</h2>
                              <form onSubmit={handleFormSubmit}>
                                  <Grid container>
                                      <Grid item lg={6}>
                                          <TextField label="Arweave Link"
                                                     variant="standard"
                                                     required
                                                     value={arweaveLink}
                                                     onInput={(e: React.ChangeEvent<HTMLInputElement>) => setArweaveLink(e.target.value)}
                                                     style={{width: "90%"}}/>
                                      </Grid>
                                      <Grid item lg={6}>
                                          <TextField label="Wallet address"
                                                     variant="standard"
                                                     required
                                                     value={walletId}
                                                     onInput={(e: React.ChangeEvent<HTMLInputElement>) => setWalletId(e.target.value)}
                                                     style={{width: "90%"}}/>
                                      </Grid>
                                      <Grid item lg={12}>
                                          <div className="divider"></div>
                                          <Button variant={"contained"} className="button-main"
                                                  type="submit">Check</Button>
                                      </Grid>
                                  </Grid>
                              </form>
                            {responseJSON &&
                                <div style={{textAlign: "left"}} className="json-area">
                                    <pre>
                                      {JSON.stringify(responseJSON, null, 4)}
                                  </pre>
                                </div>
                            }
                            {error &&
                                <div className="json-area">
                                    An error occurred, please try again.
                                </div>
                            }
                          </div>
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

export default MedicalRecords;
