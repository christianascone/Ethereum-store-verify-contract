/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require('dotenv').config();
 require("@nomiclabs/hardhat-ethers");
 require("@nomicfoundation/hardhat-chai-matchers")
 const { API_URL, PRIVATE_KEY } = process.env;
 module.exports = {
   solidity: "0.8.16",
   defaultNetwork: "localhost",
   networks: {
     hardhat: {},
     mumbai: {
       url: API_URL,
       accounts: [`0x${PRIVATE_KEY}`]
     }
   },
 }
 