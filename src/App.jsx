import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'; // Correct import
import { getContract } from './utils/contract';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    alert('App component mounted');
  }, []);

  const handleWriteOnWall = async () => {
    alert('handleWriteOnWall called');
    if (window.ethereum) {
      try {
        alert('MetaMask is installed');

        // Correct usage of ethers.providers.Web3Provider
        const provider = new ethers.BrowserProvider(window.ethereum); // Updated for ethers v6
        const contract = getContract(provider);

        alert('Contract instance created');

        // Send transaction
        const tx = await contract.writeMessage(message);
        alert('Transaction sent: ' + JSON.stringify(tx));
        await tx.wait();
        alert('Message written on the wall!');
      } catch (error) {
        alert('Error in handleWriteOnWall: ' + error.message);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div>
      <h1>Write on the Wall</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message (no links allowed)"
      />
      <button onClick={handleWriteOnWall}>Write on Wall</button>
    </div>
  );
}

export default App;