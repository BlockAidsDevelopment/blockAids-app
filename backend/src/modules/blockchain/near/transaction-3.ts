import near from "near-api-js";

const nearAPI = require("near-api-js");

export const getAccount = async () => {
  const privateKey =
    "ed25519:4bdzKh59kVScpaBZwHw5hs7h9GX4PeguvKzu5r51oXqSR3etu4K7AL4NuCFHFmA4CUjXr5owYbxCs2X2Ev11nTS4";
  const NEAR_NETWORK_ID = "testnet";
  const ACCOUNT_ID = "blockaids_dev.testnet";

  const keyStore = new near.keyStores.InMemoryKeyStore();
  const keyPair = nearAPI.KeyPair.fromString(privateKey);
  await keyStore.setKey(NEAR_NETWORK_ID, ACCOUNT_ID, keyPair);

  const near_ = await nearAPI.connect({
    keyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    networkId: NEAR_NETWORK_ID,
  });


  return new near.Account(near_.connection, ACCOUNT_ID);


  // const keyPair = nearAPI.KeyPair.fromString(privateKey);
  //
  // const near = await nearAPI.connect({
  //   networkId: NEAR_NETWORK_ID,
  //   nodeUrl: "https://rpc.testnet.near.org",
  //   keyStore: new nearAPI.keyStores.InMemoryKeyStore().setKey(
  //     NEAR_NETWORK_ID,
  //     ACCOUNT_ID,
  //     keyPair,
  //   ),
  // });
  //
  // return await near.account(ACCOUNT_ID);
};

export const getContract = async () => {
  const account = await getAccount();
  const CONTRACT_ID = "block.blockaids_dev.testnet";

  return new nearAPI.Contract(account, CONTRACT_ID, {
    useLocalViewExecution: true,
    viewMethods: [],
    changeMethods: ["ft_transfer"],
  });
};

export const transfer = async (receiverAccountId: string, amount: string) => {
  const contract = await getContract();
  const formattedAmount = nearAPI.utils.format.formatNearAmount(
    amount,
    9,
  );

  await contract.ft_transfer({
    receiver_id: receiverAccountId,
    amount: formattedAmount,
  });

  console.log("Success");
};
