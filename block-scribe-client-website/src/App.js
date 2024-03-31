import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import WalletConnection from './Components/WalletConnection/WalletConnection';
import { useWallet } from './WalletProvider';

import DisconnectedPage from './Pages/DisconnectedPage';
import ConnectedPage from './Pages/ConnectedPage';


const socket = io('http://localhost:4000');

function App() {

  const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setReceivedMessages((prevMessages) => [...prevMessages, data]);
        });

        // Cleanup on unmount
        return () => socket.off('receive_message');
    }, []);

    const sendMessage = () => {
        socket.emit('send_message', message);
        setMessage('');
    };




  const { isConnected } = useWallet();
  
  
  return (
    <div className="App">
      <WalletConnection />
      {isConnected ? <ConnectedPage /> : <DisconnectedPage />}

      <div>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
            />
            <button onClick={sendMessage}>Send</button>
            <div>
                <h2>Received Messages:</h2>
                {receivedMessages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
        </div>
    </div>
  );
}

export default App;
