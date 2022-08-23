//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract EthereumStoreVerify is Ownable {
    struct StoreData {
        string eventType;
        uint256 eventId;
        string uuid;
        string data1;
        string data2;
        uint256 data3;
        bool initialized;
    }
    mapping(string => StoreData) dataArray;

    event StoredDataEvent(string);

    /**
     * Stores the given data using a unique identifier.
     * Can be called only be the owner and it checks the object does not already exists.
     */
    function add(StoreData memory _data) public onlyOwner {
        string memory identifier = buildIdentifier(_data);
        StoreData memory existing = dataArray[identifier];
        require(!existing.initialized);
        _data.initialized = true;
        dataArray[identifier] = _data;
        emit StoredDataEvent(identifier);
    }

    /**
     * Verifies if given data are stored in contract and they are equal.
     */
    function verifyData(StoreData memory _data) public view returns (bool) {
        string memory identifier = buildIdentifier(_data);
        StoreData memory storedData = dataArray[identifier];
        return
            storedData.initialized &&
            compareStrings(_data.eventType, storedData.eventType) &&
            _data.eventId == storedData.eventId &&
            compareStrings(_data.uuid, storedData.uuid) &&
            compareStrings(_data.data1, storedData.data1) &&
            compareStrings(_data.data2, storedData.data2) &&
            _data.data3 == storedData.data3;
    }

    /**
     * Compare two strings
     */
    function compareStrings(string memory a, string memory b)
        private
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    /**
     * Builds the identifier using given StoreData.
     * It concatenates eventType, eventId and uuid using "_" as glue.
     * For example: OBJECT_999_123e4567-e89b-12d3-a456-426614174000
     */
    function buildIdentifier(StoreData memory _data)
        private
        pure
        returns (string memory)
    {
        return
            string.concat(
                _data.eventType,
                "_",
                Strings.toString(_data.eventId),
                "_",
                _data.uuid
            );
    }
}
