import {connect, keyStores, WalletConnection, Account, utils, KeyPair, InMemorySigner} from "near-api-js";

const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;

const NearTest = () => {
  // const {connect, keyStores, WalletConnection} = nearAPI;
  const keyPair = KeyPair.fromString(''); // Replace with your actual private key
  const signer = new InMemorySigner(keyPair);

  const config = {
    networkId: 'testnet', // change to 'mainnet' for mainnet
    nodeUrl: 'https://rpc.testnet.near.org', // change to mainnet RPC URL if needed
    walletUrl: 'https://wallet.testnet.near.org', // change to mainnet wallet URL if needed
    helperUrl: 'https://helper.testnet.near.org', // change to mainnet helper URL if needed
    contractName: 'block.blockaids_dev.testnet', // NEAR fungible token contract name
    signer: signer
  };

  const transfer = async () => {
    const near = await connect(Object.assign({deps: {keyStore: new keyStores.BrowserLocalStorageKeyStore()}}, config));
    // const wallet = new WalletConnection(near, "");
    const nearConf = await nearAPI.connect(config);
    // console.log(wallet);
    const contractAccount = new Account(near.connection, config.contractName);

    console.log(contractAccount);

    const result = await contractAccount.functionCall({
        contractId: config.contractName,
        methodName: 'ft_transfer',
        args: {receiver_id: "consumer_ba.testnet", amount: "10"},
        gas: utils.format.parseNearAmount('0.0001')
      },
      // config.contractName,
      // 'ft_transfer',
      // {receiver_id: receiverAccountId, amount: amount.toString()},
      // new nearAPI.utils.format.NEARAmount('0.0001') // NEAR fees
    );
    console.log(`Tokens transferred successfully: ${result.transaction.hash}`);
  }


// // Example 1: Check token balance of an account
//   async function checkBalance(accountId) {
//     const balance = await contractAccount.viewFunction(config.contractName, 'ft_balance_of', {account_id: accountId});
//     console.log(`Token balance of ${accountId}: ${balance}`);
//   }
//
// // Example 2: Transfer tokens to another account
//   async function transferTokens(senderAccountId, receiverAccountId, amount) {
//     const result = await contractAccount.functionCall(
//       config.contractName,
//       'ft_transfer',
//       {receiver_id: receiverAccountId, amount: amount.toString()},
//       new nearAPI.utils.format.NEARAmount('0.0001') // NEAR fees
//     );
//     console.log(`Tokens transferred successfully: ${result.transaction.hash}`);
//   }

// // Usage examples
//   checkBalance('alice.testnet');
//   transferTokens('alice.testnet', 'bob.testnet', '100'); // Transfer 100 tokens from Alice to Bob
//

  return (
    <>
      <button onClick={transfer}>Test transfer</button>
    </>
  )
}

export default NearTest;
