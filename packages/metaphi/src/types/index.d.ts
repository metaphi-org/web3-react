declare module "@metaphi/airwallet-api";

declare global {
    interface Window {
      WalletPlugin: any;
      MetaphiModal: any;
    }
  }
  