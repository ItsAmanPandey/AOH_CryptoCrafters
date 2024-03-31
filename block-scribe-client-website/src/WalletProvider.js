import React, { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setIsConnected(true);
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          setAccount(accounts[0]);
        } else {
          alert('Please install MetaMask to use this feature.');
        }
      } catch (error) {
        console.error('Error connecting MetaMask:', error);
      }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount(null);
  };

  return (
    <WalletContext.Provider value={{ isConnected, account, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
