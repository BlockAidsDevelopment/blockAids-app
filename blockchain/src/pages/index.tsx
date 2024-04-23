import "@near-wallet-selector/modal-ui/styles.css";
import ConnectWallet from "@/components/ConnectWallet";
import {useEffect, useState} from "react";
import {useSearchParams} from 'next/navigation'
import useNearStore from "@/stories/useNearStore";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ApprovalIcon from '@mui/icons-material/Approval';

const Home = () => {
  const [readyToAddAccount, setReadyToAddAccount] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const {account} = useNearStore();
  const [userData, setUserData] = useState<any>({
    email: undefined,
    id: undefined,
    type: undefined,
  })
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<any>(null);

  useEffect(() => {
    const moderate = searchParams.get('moderate');
    if (moderate) {
      setReadyToAddAccount(true);
      const moderateString = atob(moderate);
      const [email, id, type] = moderateString.split('|');
      setUserData({email, id, type});
    }
  }, [searchParams]);

  const saveAccountId = async () => {
    let backendUrl = `http://localhost:4000/api/specialists/${userData.id}`

    if (userData.type === "user") {
      backendUrl = `http://localhost:4000/api/users/${userData.id}`
    }

    const data = {email: userData.email, account_id: account?.accountId};

    try {
      const response = await fetch(
        backendUrl,
        {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PATCH'
        }
      );

      if (response.status >= 400) {
        return setError("There is an error, try latter please.");
      }

      if (response.status === 200) {
        return setSuccess("You've applied successfully for moderation!");
      }

    } catch (error) {
      return setError("There is an error, try latter please.");
    }
  };

  return (
    <div className="home-page">
      <ConnectWallet/>
      <div className="divider"></div>
      {
        readyToAddAccount && <div style={{textAlign: "center"}}>
          {
            !success &&
              <>
                {
                  account &&
                    <div>
                        <p>Add Wallet ID and apply for moderation</p>
                        <Button variant={"contained"} onClick={saveAccountId} className="button-main">
                            <ApprovalIcon/>
                            apply now
                        </Button>
                    </div>
                }
              </>
          }
          {
            success && <>
                  <p>{success}</p>
                  <a href="http://localhost:3001">
                      <Button><ArrowBackIosIcon/> go back</Button>
                  </a>
              </>
          }
          </div>
      }

    </div>
  )
}

export default Home;
