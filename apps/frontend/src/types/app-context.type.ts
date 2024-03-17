import { ApplicationConfiguration, FiatConfig, ModalConfig, ToastConfig, WalletConnect, AuthResponse } from './app-config.type';
import { Fund, ListInvoices, ListPayments, ListPeers, ListBitcoinTransactions, NodeInfo, WalletBalances, ListLightningTransactions, NodeFeeRate, ListOffers, ListPeerChannels, ChannelsDomain, ListNodes } from './lightning-wallet.type';

export type AppContextType = {
  authStatus: AuthResponse;
  showModals: ModalConfig;
  showToast: ToastConfig;
  walletConnect: WalletConnect;
  appConfig: ApplicationConfiguration;
  fiatConfig: FiatConfig;
  feeRate: NodeFeeRate;
  nodeInfo: NodeInfo;
  listFunds: Fund;
  listPeers: ListPeers;
  channels: ChannelsDomain;
  listInvoices: ListInvoices;
  listPayments: ListPayments;
  listOffers: ListOffers;
  listLightningTransactions: ListLightningTransactions;
  listBitcoinTransactions: ListBitcoinTransactions;
  walletBalances: WalletBalances;
  setAuthStatus: (newValue: AuthResponse) => void;
  setShowModals: (newShowModals: ModalConfig) => void;
  setShowToast: (newShowToast: ToastConfig) => void;
  setWalletConnect: (newWalletConnect: WalletConnect) => void;
  setConfig: (newAppConfig: ApplicationConfiguration) => void;
  setFiatConfig: (newFiatConfig: FiatConfig) => void;
  setFeeRate: (feeRate: NodeFeeRate) => void;
  setNodeInfo: (newNodeInfo: NodeInfo) => void;
  setListFunds: (fundsList: Fund) => void;
  setListPeers: (peersList: ListPeers) => void;
  setChannels: (data: (ListPeerChannels | ListNodes)) => void;
  setListInvoices: (invoicesList: ListInvoices) => void;
  setListPayments: (paymentsList: ListPayments) => void;
  setListOffers: (offersList: ListOffers) => void;
  setListBitcoinTransactions: (transactionsList: ListBitcoinTransactions) => void;
  clearStore: () => void;
};
