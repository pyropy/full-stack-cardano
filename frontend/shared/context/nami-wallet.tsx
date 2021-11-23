import React, { useContext, createContext, FC, useState, useEffect } from 'react';

enum Network {
  TESTNET = 0,
  MAINNET = 1,
}

export type Wallet = {
  enable: () => Promise<boolean>;
  isEnabled: () => Promise<boolean>;
  getBalance: () => Promise<string>;
  getNetworkId: () => Promise<Network>;
  signTx: (encodedTx: string) => Promise<string>;
  getUsedAddresses: () => Promise<string[]>;
  getUtxos: () => Promise<string[]>;
  submitTx: (encodedSignedTx: string) => Promise<string>;
  onAccountChange: (_: () => Promise<void>) => Promise<void>;
  signData: (encodedAddress: string, message: string) => Promise<string>;
};

type NamiWalletContext = {
  wallet?: Wallet;
  useWallet: () => Wallet | undefined;
  setWallet: (wallet: Wallet) => void;
  address?: string;
  setAddress: (address: string) => void;
  isEnabled: boolean;
  setIsEnabled: (isEnabled: boolean) => void;
  checkConnection: () => void;
};

declare global {
  interface Window {
    cardano?: Wallet;
  }
}

const decodeAddress = (str: string) => str;

export const NamiWalletContext = createContext({} as NamiWalletContext);

type UseNamiWalletContext = () => NamiWalletContext;

export const useNamiWalletContext: UseNamiWalletContext = () => useContext(NamiWalletContext);

export const NamiWalletContextProvider: FC = ({ children }) => {
  const [address, setAddress] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [wallet, setWallet] = useState<Wallet>();


  const checkConnection = async () => {
    if (window.cardano && (await window.cardano.isEnabled())) {
    //   if ((await window.cardano.getNetworkId()) !== networkId) {
    //     console.log('Wrong network');
    //     return setIsEnabled(false);
    //   }

      const encodedAddress = (await window.cardano.getUsedAddresses())[0];
      const address = decodeAddress(encodedAddress);
      setAddress(address);
      setIsEnabled(!!address);
    }
  };

  useEffect(() => {
    if (isEnabled) {
      window?.cardano?.onAccountChange(async () => {
        const addresses = await window.cardano?.getUsedAddresses();
        const encodedAddress = addresses ? addresses[0] : 'Cant load wallet address';
        const address = decodeAddress(encodedAddress);
        setAddress(address);
        setIsEnabled(!!address);
      });
    }
  }, [isEnabled]);

  useEffect(() => {
    checkConnection();
  }, [isEnabled, wallet]);

  useEffect(() => {
    window.cardano ? setWallet(window.cardano) : setTimeout(() => setWallet(window.cardano), 300);
  }, []);



  const useWallet = () => window.cardano;

  return (
    <NamiWalletContext.Provider
      value={{
        wallet,
        useWallet,
        setWallet,
        address,
        setAddress,
        isEnabled,
        setIsEnabled,
        checkConnection
      }}
    >
      {children}
    </NamiWalletContext.Provider>
  );
};
