import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getContract } from './utils/contract';


useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          console.log('Connected account:', accounts[0]); // Debugging log
        })
        .catch(error => {
          console.error('Error connecting to MetaMask:', error); // Debugging log
        });
    }
  }, []);
  

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('App component mounted'); // Debugging log
  }, []);

  const handleWriteOnWall = async () => {
    console.log('handleWriteOnWall called'); // Debugging log
    if (window.ethereum) {
      try {
        console.log('MetaMask is installed'); // Debugging log
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = getContract(provider);

        console.log('Contract instance created'); // Debugging log

        // Send transaction
        const tx = await contract.writeMessage(message);
        console.log('Transaction sent:', tx); // Debugging log
        await tx.wait();
        alert('Message written on the wall!');
      } catch (error) {
        console.error('Error in handleWriteOnWall:', error); // Debugging log
        alert('Error writing message: ' + error.message);
      }
    } else {
      console.log('MetaMask is not installed'); // Debugging log
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