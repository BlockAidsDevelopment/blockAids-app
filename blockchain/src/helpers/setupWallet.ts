import {setupWalletSelector} from "@near-wallet-selector/core";
import {setupMyNearWallet} from "@near-wallet-selector/my-near-wallet";

export const setupWallet = () => {
  return setupWalletSelector({
    network: "testnet",
    modules: [ setupMyNearWallet()],
  });
}
