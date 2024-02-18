import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import YourContractABI from './YourContractABI.json'; // Import your smart contract ABI
const contractAddress = '0x8ccb73933d257Bb687DFE544DC43e7F4c12bF0aE'; // Replace with your contract address

function App() {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          setWeb3(web3Instance);
        } catch (error) {
          console.error(error);
        }
      } else if (window.web3) {
        // Legacy dapp browsers
        const web3Instance = new Web3(window.web3.currentProvider);
        setWeb3(web3Instance);
      } else {
        // Fallback to Infura provider
        const infuraEndpoint = 'https://avalanche-fuji.infura.io/v3/5c6647137bbc40dd9b7d04aa03c7f6c3';
        const web3Instance = new Web3(new Web3.providers.HttpProvider(infuraEndpoint));
        setWeb3(web3Instance);
      }
    };    
    initWeb3();
  }, []);

  const upload = async () => {
    if (!web3) {
      console.error('Web3 not initialized');
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        console.error('No accounts found. Make sure MetaMask is installed and unlocked.');
        return;
      }
      const contract = new web3.eth.Contract(YourContractABI, contractAddress);
      const from = accounts[0];
      const result = await contract.methods.mintNFT("QmTBNvKjguUDa4jDwCAEo3Y4GZin3FrjibyFCBuBFZDw9V").send({ from });
      console.log('Upload successful!', result);
    } catch (error) {
      console.error('Error uploading:', error);
    }
  };
  
  const download = async () => {
    if (!web3) {
      console.error('Web3 not initialized');
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(YourContractABI, contractAddress);
      await contract.methods.download().send({ from: accounts[0] });
      console.log('Download successful!');
    } catch (error) {
      console.error('Error downloading:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const tokenId = event.target.tokenId.value;
    await download(tokenId);
  };

  return (
    <div>
      <h1>Trust File</h1>
      <button onClick={upload}>Upload</button>
      <button onClick={download}>Download</button>
      <form onSubmit={handleFormSubmit}>
        <label>
          Token ID:
          <input type="text" name="tokenId" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
