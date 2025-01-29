import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getContract } from './utils/contract';
import backgroundImage from './assets/retona16.png';
import './App.css'; // Import the CSS file



function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const containsLink = (text) => {
    // Regular expression to match common link patterns
    const linkPattern = /(https?:\/\/|www\.|\.com|\.net|\.org|\.io|\.co|\.ai|\.dev\.app\.xyz)/i;
    return linkPattern.test(text);
  };

  

  const handleWriteOnWall = async () => {
    if (window.ethereum) {
      try {

        if (containsLink(message)) {
          alert('Messages cannot contain internet links. Please remove any links and try again.');
          return; // Stop the function if links are found
        }
        setLoading(true);
        //alert('handleWriteOnWall called');

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = getContract(signer);

        //alert('Waiting for Transaction to be complted');

        const tx = await contract.writeMessage(message);
        //alert('Transaction sent: ' + JSON.stringify(tx));
        
        // Wait for the transaction to be confirmed
      const receipt = await tx.wait();

      // Get the transaction hash
      const txHash = receipt.hash; // Declare and initialize txHash
        
      alert('Your message has been placed On-Chain on OverProtocol!');
 
      const txLink = `https://scan.over.network/tx/${txHash}`;
      // Show a confirmation popup
      const shouldOpenLink = window.confirm('Transaction successful! Click OK to view the transaction on Over Network Scan. Please unblock popups if you are unable to view the transaction.');
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