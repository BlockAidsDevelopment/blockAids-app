import Button from "@mui/material/Button";
import {useEffect} from "react";
import {setupModal} from "@near-wallet-selector/modal-ui";
import {setupWallet} from "@/helpers/setupWallet";
import useNearStore from "@/stories/useNearStore";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';

const ConnectWallet = () => {
  const {wallet, account, modal, setSelector, setWallet, setAccount, setModal} = useNearStore();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const mySelector = await setupWallet();
      setSelector(mySelector);
      const modal = setupModal(mySelector, {
        contractId: "token-aid.near",
        methodNames: ["ft_transfer"]
      });
      setModal(modal);
      const myWallet = await mySelector.wallet("my-near-wallet");
      setWallet(myWallet);
      if (myWallet) {
        const myAccounts = await myWallet.getAccounts();
        setAccount(myAccounts[0]);
      }
    } catch (e) {
      console.log(e)
    }
  }

  const signUp = () => {
    if (modal) {
      modal.show();
    }
  }

  const signOut = async () => {
    if (wallet) {
      await wallet.signOut();
      await init();
    }
  }

  return (
    <div className="connect-wallet-section">
      {
        !account &&
          <Button variant="contained" size={"large"} onClick={signUp} className="button-main">
              <AccountBalanceWalletIcon/>
              Connect Your Wallet
          </Button>
      }
      {
        account &&
          <div>
              <p className="text-green_">{account.accountId}</p>
              <div className="divider"></div>
              <Button variant="contained" size={"large"} onClick={signOut} className="button-main-min">
                  <LogoutIcon/>
                  Sign Out
              </Button>

          </div>
      }
    </div>
  )
}

export default ConnectWallet;
