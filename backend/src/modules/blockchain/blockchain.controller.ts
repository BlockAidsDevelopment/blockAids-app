import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { NearService } from "./near/near.service";
const { Contract } = require("near-api-js");
import { transferTokens } from "./near/transation";


@ApiTags("Blockchain")
@Controller("api/blockchain")
export class BlockchainController {
  constructor(private readonly nearService: NearService) {}

  @ApiResponse({ status: 200, type: Object })
  @ApiOperation({ summary: "Transfer Tokens" })
  @Post("/transfer")
  async transfer(@Body() transferData: any) {
    const senderAccountId = "blockaids_dev.testnet";
    const senderPrivateKey = "";
    const receiverAccountId = "consumer_ba.testnet";
    const transferAmount = 1; // Amount in base units (e.g., if token has 24 decimals, 1 token = 10^24 base units)

    // await transfer("consumer_ba.testnet", "10000000000000000000000000");

    const res = await transferTokens(
      senderAccountId,
      senderPrivateKey,
      receiverAccountId,
      transferAmount,
    );

    console.log(res);
    // console.log(res);
    // const { connect, Contract } = nearAPI;
    // const ACCOUNT_ID = "block.blockaids_dev.testnet"; // NEAR account tied to the keyPair
    // const NETWORK_ID = "testnet";
    // const KEY_PATH =
    //   "/Documents/Projects/blockaids/blockAids-app/backend/src/modules/blockchain/block.blockaids_dev.testnet.json";
    // const credentials = JSON.parse(fs.readFileSync(homedir + KEY_PATH));
    // const myKeyStore = new keyStores.InMemoryKeyStore();
    //
    // const keys = await myKeyStore.setKey(
    //   NETWORK_ID,
    //   ACCOUNT_ID,
    //   KeyPair.fromString(credentials.private_key),
    // );
    //
    // const connectionConfig = {
    //   networkId: "testnet",
    //   keyStore: keys, // first create a key store
    //   nodeUrl: "https://rpc.testnet.near.org",
    //   walletUrl: "https://testnet.mynearwallet.com/",
    //   helperUrl: "https://helper.testnet.near.org",
    //   explorerUrl: "https://testnet.nearblocks.io",
    // };
    //
    // const nearConnection = await connect(connectionConfig);
    // const account = await nearConnection.account(ACCOUNT_ID);

    // await this.contractExample(account);
    // const contract = new Contract(account, "block.blockaids_dev.testnet", {
    //   changeMethods: ["transfer"],
    //   viewMethods: [""],
    //   useLocalViewExecution: true,
    // });

    // const response = await contract.getMe
    // const contract = new Contract(
    //   account,
    //   "block.blockaids_dev.testnet",
    //   {
    //   changeMethods: ["transfer"],
    // });

    // const response = await contract.transfer({
    //   receiver_id: "blockaids_dev.testnet",
    //   amount: "100000",
    // });

    // console.log(contract);
    return {};
  }

  async contractExample(account: any) {
    const methodOptions = {
      viewMethods: ["balance_of"],
      changeMethods: ["transfer"],
    };
    const contract = new Contract(
      account,
      "block.blockaids_dev.testnet",
      methodOptions,
    );

    // use a contract view method
    // const messages = await contract.balance_of({
    //   accountId: "example-account.testnet",
    // });

    // // use a contract change method
    // await contract.addMessage({
    //   meta: "some info",
    //   callbackUrl: "https://example.com/callback",
    //   args: { text: "my message" },
    //   amount: 1,
    // });

    console.log(contract);
  }
}
