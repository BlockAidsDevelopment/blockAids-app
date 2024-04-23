import {setupWalletSelector} from "@near-wallet-selector/core";
import {setupMyNearWallet} from "@near-wallet-selector/my-near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import { setupNightly } from "@near-wallet-selector/nightly";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupNearFi } from "@near-wallet-selector/nearfi";
import { setupCoin98Wallet } from "@near-wallet-selector/coin98-wallet";
export const setupWallet = () => {
  return setupWalletSelector({
    network: "testnet",
    modules: [
      setupMyNearWallet(),
      setupSender(),
      setupHereWallet(),
      setupMathWallet(),
      setupNightly(),
      setupMeteorWallet(),
      setupLedger(),
      setupNearFi(),
      setupCoin98Wallet(),
    ],
  });
}
