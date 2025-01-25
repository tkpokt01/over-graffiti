import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getContract } from './utils/contract';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    alert('App component mounted'); // Debugging alert
  }, []);

  const handleWriteOnWall = async () => {
    alert('handleWriteOnWall called'); // Debugging alert
    if (window.ethereum) {
      try {
        alert('MetaMask is installed'); // Debugging alert
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = getContract(provider);

        alert('Contract instance created'); // Debugging alert

        // Send transaction
        const tx = await contract.writeMessage(message);
        alert('Transaction sent: ' + JSON.stringify(tx)); // Debugging alert
        await tx.wait();
        alert('Message written on the wall!');
      } catch (error) {
        alert('Error in handleWriteOnWall: ' + error.message); // Debugging alert
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