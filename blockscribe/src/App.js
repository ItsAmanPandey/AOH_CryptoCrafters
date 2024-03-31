import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { response } from 'express';

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [backEndData, setBackEndData] = useState([{}])
  const [counts, setCounts] = useState({
    Dex: 0,
    Lending: 0,
    Yield: 0,
    "Cross Chain": 0,
  });

  const contractAddress = [{
    category: 'Dex',
    address: [
      '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
      '0x1f721e2e82f6676fce4ea07a5958cf098d339e18',
      '0xb4315e873dbcf96ffd0acd8ea43f689d8c20fb30',
      '0x1111111254eeb25477b68fb85ed929f73a960582']
  },
  {
    category: 'Lending',
    address: [
      '0xf4b1486dd74d07706052a33d31d7c0aafd0659e1',
      '0xadb9d68c613df4aa363b42161e1282117c7b9594',
      '0x102442a3ba1e441043154bc0b8a2e2fb5e0f94a7',
      '0x794a61358d6845594f94dc1db02a252b5b4814ad']
  },
  {
    category: 'Yield',
    address: [
      '0x617963d46b882ece880ab18bc232f513e91fdd47',
      '0x98ece0d8abd1f96672a497d3053999df172faa8b']
  },
  {
    category: 'Cross Chain',
    address: [
      '0xee9dec2712cce65174b561151701bf54b99c24c8',
      '0x7e7a0e201fd38d3adaa9523da6c109a07118c96a',
      '0x53bf833a5d6c4dda888f69c22c88c9f356a41614']
  }
  ];

  useEffect(() => {

    fetch("/api/*").then(
      response => response.json()
    ).then(
      data =>{
      setBackEndData(data)
      }
    )
    console.log(backEndData)
    const fetchTransactions = async () => {
      if (!userAddress) return;

      const apiKey = 'GTN8QTKAI37QQW6ICSPKWNK9UYEE4FWWUH';
      const url = `https://api.arbiscan.io/api?module=account&action=txlist&address=${userAddress}&startblock=0&endblock=latest&sort=desc&apikey=${apiKey}`;

      try {
        const response = await axios.get(url);
        if (response.data.status === '1') {
          setTransactions(response.data.result);

          let initialCounts = { Dex: 0, Lending: 0, Yield: 0, "Cross Chain": 0 };

          response.data.result.forEach((transaction) => {
            contractAddress.forEach((contract) => {
              if (contract.address.includes(transaction.to)) {
                initialCounts[contract.category] += 1;
              }
            });
          });

          setCounts(initialCounts);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, [userAddress]);

  const handleAddressChange = (e) => {
    setUserAddress(e.target.value);
  };

  return (
    <div className="App">
      <h1>Contract Transaction Explorer</h1>
      <input type="text" value={userAddress} onChange={handleAddressChange} placeholder="Enter Contract Address" />
      {userAddress && (
        <div>
          <h2>Transactions for Contract: {userAddress}</h2>
          {Object.entries(counts).map(([category, count]) => (
            <h2 key={category}>{category}: {count}</h2>
          ))}
          {transactions.length > 0 ? (
            <ul>
              {transactions.map(transaction => (
                <li key={transaction.hash}>
                  <a href={`https://arbiscan.io/tx/${transaction.hash}`} target="_blank" rel="noopener noreferrer">
                    {transaction.to} (to)
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No transactions found for this contract.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;