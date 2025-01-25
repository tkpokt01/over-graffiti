import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getContract } from './utils/contract';

function App() {
  const [message, setMessage] = useState('');

  // useEffect to connect to MetaMask when the component mounts
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          alert('Connected account: ' + accounts[0]); // Debugging alert
        })
        .catch(error => {
          alert('Error connecting to MetaMask: ' + error.message); // Debugging alert
        });
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleWriteOnWall = async () => {
    alert('handleWriteOnWall called');
    if (window.ethereum) {
      try {
        alert('MetaMask is installed');

        // Initialize the provider and signer
        const provider = new ethers.BrowserProvider(window.ethereum); // Updated for ethers v6
        const signer = await provider.getSigner(); // Get the signer
        const contract = getContract(signer); // Pass the signer instead of the provider

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