async function main() {

    const contract = require("../artifacts/contracts/ethereum-store-verify.sol/EthereumStoreVerify.json")
    const EthereumStoreVerify = await ethers.getContractFactory(contract.abi, contract.bytecode)

    const ethereumStoreVerify = await EthereumStoreVerify.deploy()
    await ethereumStoreVerify.deployed()
    console.log("Contract deployed to address:", ethereumStoreVerify.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
