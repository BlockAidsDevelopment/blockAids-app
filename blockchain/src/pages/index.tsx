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
    let backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/specialists/${userData.id}`

    if (userData.type === "user") {
      backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userData.id}`
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
        setSuccess("You've applied successfully for moderation!");
      }

      window.location.href = 'https://app.next.fractal.id/authorize?client_id=PZP8B8T6QepdoUbcJQiTdW9qtmwHZPt6f2hbQ490toM&redirect_uri=https%3A%2F%2Fwallet.blockaids.online%2Ffractal%2Fcb&response_type=code&scope=contact%3Aread%20verification.basic%3Aread%20verification.basic.details%3Aread%20verification.liveness%3Aread%20verification.liveness.details%3Aread'
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
                  <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}`}>
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
