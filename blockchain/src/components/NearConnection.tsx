import {useEffect, useState} from "react";
import {setupWallet} from "@/helpers/setupWallet";
import {Account, Wallet, WalletSelector} from "@near-wallet-selector/core";
import {setupModal, WalletSelectorModal} from "@near-wallet-selector/modal-ui";

const NearConnection = () => {
  const [selector, setSelector] = useState<WalletSelector>();
  const [wallet, setWallet] = useState<Wallet>();
  const [account, setAccount] = useState<Account>();
  const [modal, setModal] = useState<WalletSelectorModal>();

  useEffect(() => {
    init().then(() => {
    })
  }, []);

  const init = async () => {
    const mySelector = await setupWallet();
    setSelector(mySelector);
    const modal = setupModal(mySelector, {
      contractId: "test.testnet",
    });
    setModal(modal);
    const myWallet = await mySelector.wallet("my-near-wallet");
    setWallet(myWallet);
    if (myWallet) {
      const myAccounts = await myWallet.getAccounts();
      setAccount(myAccounts[0]);
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
    <>
      {
        !account && <button onClick={signUp}>Connect Wallet</button>
      }
      {
        account &&
          <>
              <button onClick={signOut}>Sign Out</button>
              <p>{account.accountId}</p>
          </>
      }
    </>
  )
}

export default NearConnection;
