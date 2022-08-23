require("dotenv").config()

if(process.argv.length < 6){
    console.log("Usage: node verify-data.js <eventType> <eventId> <uuid> <data1> <data2> <data3>")
    console.log("(Without < and >)")
    return;
}

const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
// Get ABI from compiled contract
const contract = require("../artifacts/contracts/ethereum-store-verify.sol/EthereumStoreVerify.json")

const contractAddress = process.env.CONTRACT_ADDRESS
const contractObject = new web3.eth.Contract(contract.abi, contractAddress)

async function verify(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest') //get latest nonce

    //the transaction
    const tx = {
        'from': PUBLIC_KEY, // Sender
        'to': contractAddress, // Contract address
        'nonce': nonce,
        'data': contractObject.methods.verify(tokenURI).encodeABI()
    }

    let hexString = await web3.eth.call(tx);
    let isVerified = parseInt(hexString, 16) == 1;
    isVerified ? console.log("Data verified!") : console.error("VERIFICATION FAILED!!!");
}

verify({
    eventType: process.argv[2],
    eventId: process.argv[3],
    uuid: process.argv[4],
    data1: process.argv[5],
    data2: process.argv[6],
    data3: process.argv[7],
})