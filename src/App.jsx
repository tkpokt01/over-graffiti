import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getContract } from './utils/contract';

function App() {
  const [message, setMessage] = useState('');

  const handleWriteOnWall = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = getContract(provider);

        // Send transaction
        const tx = await contract.writeMessage(message);
        await tx.wait();
        alert('Message written on the wall!');
      } catch (error) {
        console.error(error);
        alert('Error writing message: ' + error.message);
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