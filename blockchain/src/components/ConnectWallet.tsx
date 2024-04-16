import Button from "@mui/material/Button";
import {useEffect} from "react";
import {setupModal} from "@near-wallet-selector/modal-ui";
import {setupWallet} from "@/helpers/setupWallet";
import useNearStore from "@/stories/useNearStore";

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
        contractId: "block.blockaids_dev.testnet",
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
        !account && <Button variant="outlined" size={"large"} onClick={signUp}>Connect Wallet</Button>
      }
      {
        account && <><Button variant="outlined" size={"large"} onClick={signOut}>Sign Out</Button>
              <p>blockaids_dev.testnet</p>
          {/*<p>100 AID</p>*/}
          </>
      }
    </div>
  )
}

export default ConnectWallet;
