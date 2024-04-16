import create, {State} from "zustand";
import {Account, Wallet, WalletSelector} from "@near-wallet-selector/core";
import {WalletSelectorModal} from "@near-wallet-selector/modal-ui";

interface NearStore extends State {
  selector: WalletSelector | undefined;
  wallet: Wallet | undefined;
  account: Account | undefined;
  modal: WalletSelectorModal | undefined;
  setSelector: (selector: WalletSelector) => void
  setWallet: (wallet: Wallet) => void
  setAccount: (account: Account) => void
  setModal: (modal: WalletSelectorModal) => void
}

const useNearStore = create<NearStore>((set, _get) => ({
  selector: undefined,
  wallet: undefined,
  account: undefined,
  modal: undefined,
  setSelector: (data: WalletSelector) => set((selector) => ({selector: data})),
  setWallet: (data: Wallet) => set((wallet) => ({wallet: data})),
  setAccount: (data: Account) => set((account) => ({account: data})),
  setModal: (data: WalletSelectorModal) => set((modal) => ({modal: data})),
}));

export default useNearStore;
