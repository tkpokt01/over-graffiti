import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getContract } from './utils/contract';
import backgroundImage from './assets/retona16.png';
import './App.css'; // Import the CSS file

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          alert('Connected account: ' + accounts[0]);
        })
        .catch(error => {
          alert('Error connecting to MetaMask: ' + error.message);
        });
    }
  }, []);

  const handleWriteOnWall = async () => {
    if (window.ethereum) {
      try {
        setLoading(true);
        alert('handleWriteOnWall called');

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = getContract(signer);

        alert('Contract instance created');

        const tx = await contract.writeMessage(message);
        alert('Transaction sent: ' + JSON.stringify(tx));
        await tx.wait();
        alert('Your message has been placed On-Chain on OverProtoco!');
 

      const shouldOpenLink = window.confirm('To view your On-Chain Graffiti! Click OK to view the transaction on Over Network Scan.');
      if (shouldOpenLink) {
        window.open(txLink, '_blank');
      }

      // Clear the message input box
      setMessage('');


       // Get the transaction hash
       const txHash = receipt.hash;

      // Create the transaction link
      const txLink = `https://scan.over.network/tx/${txHash}`;

 // Open the transaction link in a new window
      window.open(txLink, '_blank');


      } catch (error) {
        alert('Error in handleWriteOnWall: ' + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <center><div className="app-container">
        <h1>Over Graffiti Wall</h1>
      <div className="message-box">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message (no links allowed)"
        />
        <button onClick={handleWriteOnWall} disabled={loading}>
          {loading ? 'Sending...' : 'Write on Wall'}
        </button>
      </div>
      
    </div></center>
  );
}

export default App;