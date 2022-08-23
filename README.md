# **:triangular_flag_on_post: Ethereum-store-verify-contract**
> A solidity contract which stores data on ethereum blockchain and is able to verify data afterwards

![Project Version][project-image]
![NPM Version][npm-image]
![Node Version][node-image]


## References
- https://ethereum.org/en/developers/tutorials/how-to-write-and-deploy-an-nft/
- https://ethereum.org/en/developers/tutorials/how-to-mint-an-nft/

---

## **:package: Main tools used**

- [x] NVM
- [x] Solidity
- [x] Ethers
- [x] MetaMask
- [x] Hardhat

---

## **:wrench: Developer usage**

### **Set up project**

- Choose a folder project in your system and switch in `cd [folder path]`
- Clone the repo in your folder path

---

### **Installation**

In order to install the project and all dependencies, enter in the project folder and run `npm install`

---

### Compile and deploy contract

Compile:
```bash
npx hardhat compile
```

Deploy:
```bash
npx hardhat --network mumbai run scripts/deploy.js
```

---


### Running

Store data in contract:
```bash
node scripts/add-data.js EVENT_TYPE 1 123e4567-e89b-12d3-a456-426614174000 data1 data2 123
```

Verify given data are the same stored in contract:
```bash
node scripts/verify-data.js EVENT_TYPE 1 123e4567-e89b-12d3-a456-426614174000 data1 data2 123
```

---


## **:handshake: Contributing**

- Fork it!
- Create your feature branch: `git checkout -b feature/my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin feature/my-new-feature`
- Submit a pull request

---



### **:heart: Show your support**

Please :star: this repository if you like it or this project helped you!\
Feel free to open issues or submit pull-requests to help me improving my work.


---

### **:scroll: Release history**

* 0.00.01
    * Work in progress

---

### **:robot: Author**

_*Christian Ascone*_

> You can follow me on
[GitHub](https://github.com/christianascone)&nbsp;&middot;&nbsp;[GitLab](https://gitlab.com/christianascone)

---

Copyright © 2022 [Christian Ascone](https://github.com/christianascone).

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/badge/npm-6.14.12-orange.svg
[node-image]: https://img.shields.io/badge/node-14.16.1-orange.svg
[project-image]: https://img.shields.io/badge/project-0.01.00-green.svg