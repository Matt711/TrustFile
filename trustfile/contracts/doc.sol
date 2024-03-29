// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Matthew is ERC721 {
    // Struct to hold the metadata of the NFT
    struct NFTMetadata {
        string cid; // CID of the file in IPFS
        address minter; // Wallet address of the minter
    }

    // Mapping from tokenID to NFTMetadata
    mapping(uint256 => NFTMetadata) public nftMetadata;

    // Event emitted when a new NFT is minted
    event NFTMinted(uint256 indexed tokenId, string cid, address indexed minter);

    // Counter for generating unique tokenIDs
    uint256 private tokenIdCounter;

    // Constructor
    constructor() ERC721("Matthew", "AVX") {}

    // Function to mint a new NFT
    function mintNFT(string memory _cid) external {
        uint256 newTokenId = tokenIdCounter;
        tokenIdCounter++;

        nftMetadata[newTokenId] = NFTMetadata({
            cid: _cid,
            minter: msg.sender
        });

        _safeMint(msg.sender, newTokenId);
        emit NFTMinted(newTokenId, _cid, msg.sender);
        _safeTransfer(msg.sender, nftMetadata[newTokenId].minter, newTokenId, "");
    }

    function getDocumentCID(uint256 tokenId) external view returns (string memory) {
        require(nftMetadata[tokenId].minter == msg.sender, "DocumentNFT: Caller is not the minter");
        return nftMetadata[tokenId].cid;
    }
}
