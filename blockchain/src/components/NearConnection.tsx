import {useEffect, useState} from "react";
import {setupWallet} from "@/helpers/setupWallet";
import {Account, Wallet, WalletSelector} from "@near-wallet-selector/core";
import {setupModal, WalletSelectorModal} from "@near-wallet-selector/modal-ui";
import {Connection, keyStores, WalletConnection, Contract, utils} from "near-api-js";

const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;
const SUGGESTED_DONATION = "0";

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

  const initContract = async () => {
    if (account) {
//       console.log(Connection, keyStores, WalletConnection);
//       // const {connect, keyStores, WalletConnection} = near;
//
//       // const connectionConfig = {
//       //   networkId: "testnet",
//       //   keyStore: new keyStores.BrowserLocalStorageKeyStore(),
//       //   nodeUrl: "https://rpc.testnet.near.org",
//       //   walletUrl: "https://testnet.mynearwallet.com/",
//       //   helperUrl: "https://helper.testnet.near.org",
//       //   explorerUrl: "https://testnet.nearblocks.io",
//       // };
//
// // connect to NEAR
// //       const nearConnection = await connect(connectionConfig);
//
//       // console.log(nearConnection);
// // create wallet connection
// //       const walletConnection = new WalletConnection(nearConnection);
//       // const account1 = await near.account("example-account.testnet");
      const {formatNearAmount} = utils.format;
      // @ts-ignore
      // eslint-disable-next-line no-use-before-define
      const contract = new Contract(account, "block.blockaids_dev.testnet", {
        viewMethods: [],
        changeMethods: ["ft_transfer"]
      });

      // @ts-ignore
      const transfer = await contract.ft_transfer;
      console.log(transfer());

      const formattedAmount = formatNearAmount("10", 9);

      await transferTokens(contract)
      // // @ts-ignore
      // await contract.functionCall(
      //   {
      //     receiver_id: "consumer_ba.testnet",
      //     amount: formattedAmount,
      //   },
      //   utils.format.parseNearAmount("300000000000000"),
      // );
      //
      // console.log(`Transferred 10 tokens to receiverAccountId`);
    }
  }

  async function transferTokens(contract: Contract) {
    // @ts-ignore
    const result = await contract.functionCall(
      "block.blockaids_dev.testnet",
      'ft_transfer',
      {receiver_id: "consumer_ba.testnet", amount: "10"},
      utils.format.parseNearAmount("100000000000000000000"), // NEAR fees
    );
    console.log(`Tokens transferred successfully: ${result.transaction.hash}`);
  }

  const transferTest = async () => {
    if (wallet) {
      const {formatNearAmount} = utils.format;
      const formattedAmount = formatNearAmount("1000000000000000000000000", 9);
      const attachedDeposit = "1";
      const attachedDeposit2 = formatNearAmount("1000000000000000000", 9);
      console.log(attachedDeposit2);

      const res = await wallet.signAndSendTransaction({
        signerId: account?.accountId!,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "storage_deposit",
              args: {
                "account_id": "aids-near.testnet",
                "registration_only": true,
                "amount": "0.00235"
              },
              gas: BOATLOAD_OF_GAS,
              deposit: "1"
            }
          },
          {
            type: "FunctionCall",
            params: {
              methodName: "ft_transfer",
              args: {
                "amount": "190000000000",
                "receiver_id": "aids-near.testnet",
                "memo": "Simple transfer",
                "msg": "Simple message"
              },
              gas: BOATLOAD_OF_GAS,
              deposit: attachedDeposit!,
            },
          },
        ],
      })

      console.log(res, "Success");
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
      <button onClick={initContract}>Transfer</button>
      <button onClick={transferTest}>Transfer Test</button>

    </>
  )
}

export default NearConnection;
