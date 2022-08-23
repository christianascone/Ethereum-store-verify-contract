require("dotenv").config()

if(process.argv.length < 6){
    console.log("Usage: node add-data.js <eventType> <eventId> <uuid> <data1> <data2> <data3>")
    console.log("(Without < and >)")
    return;
}

const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
// Get ABI from compiled contract
const contract = require("../artifacts/contracts/ethereum-store-verify.sol/EthereumStoreVerify.json")

const contractAddress = process.env.CONTRACT_ADDRESS
const contractObject = new web3.eth.Contract(contract.abi, contractAddress)

async function add(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest') //get latest nonce

    //the transaction
    const tx = {
        'from': PUBLIC_KEY, // Sender
        'to': contractAddress, // Contract address
        'nonce': nonce,
        'gas': 500000, // Estimated gas (https://www.0xdev.co/how-to-compute-the-gas-fee-for-a-transaction-web3/)
        'data': contractObject.methods.add(tokenURI).encodeABI()
    }

    // Sign transaction using the "tx" object
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of your transaction!"
                        )
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        )
                    }
                }
            )
        })
        .catch((err) => {
            console.log(" Promise failed:", err)
        })
}
add({
    eventType: process.argv[2],
    eventId: process.argv[3],
    uuid: process.argv[4],
    data1: process.argv[5],
    data2: process.argv[6],
    data3: process.argv[7],
})