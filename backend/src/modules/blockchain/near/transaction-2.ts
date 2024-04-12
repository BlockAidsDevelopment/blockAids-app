// import near from "near-api-js";

import near from "near-api-js";

const nearAPI = require("near-api-js");
const {KeyPair, utils} = nearAPI;
const {connect} = nearAPI;
const {formatNearAmount} = utils.format;

const NEAR_NETWORK_ID = "testnet";
const NEAR_NODE_URL = "https://rpc.testnet.near.org";
const CONTRACT_ID = "block.blockaids_dev.testnet";
const TOKEN_DECIMALS = 9;

async function initContract(accountId: any, privateKey: any) {
  const keyStore = new nearAPI.keyStores.InMemoryKeyStore();
  const keyPair = KeyPair.fromString(privateKey);
  await keyStore.setKey(NEAR_NETWORK_ID, accountId, keyPair);

  const near = await connect({
    keyStore,
    nodeUrl: NEAR_NODE_URL,
    networkId: NEAR_NETWORK_ID,
    walletUrl: "https://wallet.near.org",
  });

  const account = await new nearAPI.Account(near.connection, accountId);

  const contract = new nearAPI.Contract(account, CONTRACT_ID, {
    useLocalViewExecution: false,
    viewMethods: [],
    changeMethods: ["ft_transfer"],
  });

  return {account, contract};
}

export async function transferTokens(
  senderAccountId: string,
  privateKey: string,
  receiverAccountId: string,
  amount: number,
) {
  // try {
  const {account, contract} = await initContract(senderAccountId, privateKey);
  // console.log(account)
  // return;
  const formattedAmount = formatNearAmount(amount.toString(), TOKEN_DECIMALS);

  await contract.ft_transfer(
    {
      receiver_id: receiverAccountId,
      amount: formattedAmount,
    },
    utils.format.parseNearAmount("100000000000000000000"),
  );
  console.log(`Transferred ${amount} tokens to ${receiverAccountId}`);
  // } catch (error) {
  //   console.error("Error transferring tokens:", error);
  // }
}
