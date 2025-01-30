import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { getContract } from './utils/contract';
import backgroundImage from './assets/retona16.png';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  const containsLink = (text) => {
    const linkPattern = /(https?:\/\/|www\.|\.com|\.net|\.org|\.io|\.co|\.ai|\.dev|\.app|\.xyz)/i;
    return linkPattern.test(text);
  };

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: { 1: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID' },
      },
    },
  };

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal({ cacheProvider: true, providerOptions });
      const instance = await web3Modal.connect();
      const web3Provider = new ethers.BrowserProvider(instance);
      const signer = await web3Provider.getSigner();
      const userAddress = await signer.getAddress();
      
      setProvider(web3Provider);
      setAccount(userAddress);
      setContract(getContract(signer));
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const disconnectWallet = async () => {
    const web3Modal = new Web3Modal();
    web3Modal.clearCachedProvider();
    setAccount(null);
    setProvider(null);
    setContract(null);
  };

  const handleWriteOnWall = async () => {
    if (!contract) {
      alert('Please connect your wallet first!');
      return;
    }

    if (containsLink(message)) {
      alert('Messages cannot contain internet links. Please remove any links and try again.');
      return;
    }

    try {
      setLoading(true);
      const tx = await contract.writeMessage(message);
      const receipt = await tx.wait();
      const txHash = receipt.hash;
      
      alert('Your message has been placed On-Chain on OverProtocol!');
      window.open(`https://scan.over.network/tx/${txHash}`, '_blank');
      setMessage('');
      setSuccessMessage('Message sent successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      alert('Error in handleWriteOnWall: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <center>
        <button onClick={account ? disconnectWallet : connectWallet} className="connect-btn">
          {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
        </button>
        <div className="message-box">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message (no links allowed)"
          />
          <button onClick={handleWriteOnWall} disabled={loading}>
            {loading ? 'Sending...' : 'Write on Wall'}
          </button>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      </center>
    </div>
  );
}

export default App;
