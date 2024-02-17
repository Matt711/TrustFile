pragma solidity ^0.8.0;

// Import Avalanche ERC721 contract
import "./AvalancheERC721.sol";

// DocumentNFT contract
contract DocumentNFT is AvalancheERC721 {
    // Mapping to store IPFS CID associated with each NFT token ID
    mapping(uint256 => string) private documentCID;

    // Token ID counter
    uint256 private tokenIdCounter;

    // Event to emit when a new document is minted
    event DocumentMinted(uint256 tokenId, string cid);

    // Constructor
    constructor() AvalancheERC721("DocumentNFT", "DOC") {}

    // Function to mint new NFT and upload document to IPFS
    function mintAndUploadDocument(string memory cid) external returns (uint256) {
        uint256 tokenId = tokenIdCounter++;
        documentCID[tokenId] = cid;
        _mint(msg.sender, tokenId);
        emit DocumentMinted(tokenId, cid);
        return tokenId;
    }

    // Function to get document CID
    function getDocumentCID(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "DocumentNFT: Document does not exist");
        return documentCID[tokenId];
    }
}
