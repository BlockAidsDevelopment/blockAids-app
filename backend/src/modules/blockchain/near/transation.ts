const near = require("near-api-js");
const { KeyPair, utils } = near;
const { connect } = near;
const { formatNearAmount } = utils.format;

const NEAR_NETWORK_ID = "testnet";
const NEAR_NODE_URL = "https://rpc.testnet.near.org";
const CONTRACT_ID = "block.blockaids_dev.testnet"; // Replace with your actual contract ID
const TOKEN_DECIMALS = 9; // Number of decimal places for your token

const initContract = async (accountId: any, privateKey: any) => {
  const keyStore = new near.keyStores.InMemoryKeyStore();
  const keyPair = KeyPair.fromString(privateKey);
  await keyStore.setKey(NEAR_NETWORK_ID, accountId, keyPair);

  const near_ = await connect({
    keyStore,
    nodeUrl: NEAR_NODE_URL,
    networkId: NEAR_NETWORK_ID,
  });

  const account = await new near.Account(near_.connection, accountId);

  return new near.Contract(account, CONTRACT_ID, {
    useLocalViewExecution: false,
    viewMethods: [],
    changeMethods: ["ft_transfer"],
  });
};

// Transfer tokens
export const transferTokens = async (
  senderAccountId: string,
  privateKey: string,
  receiverAccountId: string,
  amount: number,
) => {
  // try {
  const contract = await initContract(senderAccountId, privateKey);
  const formattedAmount = formatNearAmount(amount.toString(), TOKEN_DECIMALS);
  // const deposit = "1"; // 1 yoctoNEAR
  // const gasLimit = 30000000000000;

  await contract.ft_transfer(
    {
      receiver_id: receiverAccountId,
      amount: formattedAmount,
    },
    utils.format.parseNearAmount("300000000000000"),
  );

  console.log(`Transferred ${amount} tokens to ${receiverAccountId}`);
  // } catch (error) {
  //   // console.error("Error transferring tokens:", error);
  // }
};
