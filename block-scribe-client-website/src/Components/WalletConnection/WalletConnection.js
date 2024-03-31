import React from 'react';
import { useWallet } from '../../WalletProvider';

import './WalletConnection.css'

function Component() {
  const { isConnected, account, connectWallet, disconnectWallet } = useWallet();

  const formatAccount = (acc) => {
    if (acc) {
      return `${acc.slice(0, 4)}....${acc.slice(-4)}`;
    }
    return '';
  };

  return (
    <div>
      {isConnected ? (
        <div>
          <button className="walletButton" onClick={disconnectWallet}>
            <svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.207 9H5V7h7.136L11.05 5.914 12.464 4.5 16 8.036l-3.536 3.535-1.414-1.414L12.207 9zM10 4H8V2H2v12h6v-2h2v4H0V0h10v4z" fillRule="evenodd" />
            </svg>
            {formatAccount(account)}
          </button>
        </div>
      ) : (
        <button className="walletButton" onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default Component;
