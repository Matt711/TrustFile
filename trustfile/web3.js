const Web3 = require('web3');
const fs = require('fs');


const web3 = new Web3(''); 


const contractABI = JSON.parse(fs.readFileSync('YourContractABI.json', 'utf8')); 


const contractAddress = '0x8ccb73933d257Bb687DFE544DC43e7F4c12bF0aE'; 
const contract = new web3.eth.Contract(contractABI, contractAddress);


async function mintNFTAndUploadImage(imagePath) {
    try {
        
        const ipfsHash = await uploadImageToIPFS(imagePath);

      
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.mintAndUploadDocument(ipfsHash).send({ from: accounts[0] });

        console.log('NFT minted. Transaction hash:', result.transactionHash);
    } catch (error) {
        console.error('Error minting NFT and uploading image:', error);
    }
}
