// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFTSmartContact {
    struct Item {
        uint id;
        string name;
    }

    Item[] public items;
    uint public nextId = 1;

    // Create
    function create(string memory name) public {
        items.push(Item(nextId, name));
        nextId++;
    }

    // Read
    function read(uint id) view public returns (uint, string memory) {
        uint index = find(id);
        return (items[index].id, items[index].name);
    }

    // Delete
    // function destroy(uint id) public {
    //     uint index = find(id);
    //     delete items[index];
    //     items[index] = items[items.length - 1];
    //     items.pop();
    // }

    // Find the index of an item by id
    function find(uint id) view internal returns(uint) {
        for(uint i = 0; i < items.length; i++) {
            if(items[i].id == id) {
                return i;
            }
        }
        revert('Item not found');
    }
}
