import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getContract } from './utils/contract';
import backgroundImage from './assets/retona16.png';
import './App.css'; // Import the CSS file

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  //useEffect(() => {
  //  if (window.ethereum) {
  //    window.ethereum.request({ method: 'eth_requestAccounts' })
  //      .then(accounts => {
  //        alert('Connected account: ' + accounts[0]);
  //      })
  //      .catch(error => {
  //        alert('Error connecting to MetaMask: ' + error.message);
  //      });
  //  }
 // }, []);

  const handleWriteOnWall = async () => {
    if (window.ethereum) {
      try {
        setLoading(true);
        //alert('handleWriteOnWall called');

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = getContract(signer);

        //alert('Waiting for Transaction to be complted');

        const tx = await contract.writeMessage(message);
        //alert('Transaction sent: ' + JSON.stringify(tx));
        await tx.wait();
        alert('Your message has been placed On-Chain on OverProtocol!');
 
      const txLink = `https://scan.over.network/tx/${txHash}`;
      // Show a confirmation popup
      const shouldOpenLink = window.confirm('Transaction successful! Click OK to view the transaction on Over Network Scan.');
      if (shouldOpenLink) {
        window.open(txLink, '_blank'); // Open the link in a new window
      }


      // Clear the message input box
      setMessage('');

      // Show a success message
      setSuccessMessage('Message sent successfully!');

      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);


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
    <div className="app-container"><center>
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
      </center>
      
    </div>
  );
}

export default App;