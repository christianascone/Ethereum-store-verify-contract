const chai = require('chai')
var expect = chai.expect

describe("EthereumStoreVerify", function () {
  let box;

  beforeEach(async function () {
    const EthereumStoreVerify = await ethers.getContractFactory("EthereumStoreVerify")
    box = await EthereumStoreVerify.deploy();
    await box.deployed()
  })

  it("should verify stored data", async function () {
    let input = {
      eventType: "EVENT",
      eventId: 1,
      uuid: "my_uuid",
      data1: "data",
      data2: "data",
      data3: 1234,
      initialized: true
    }

    // Wait in order to ensure data are stored
    await expect(box.add(input))
      .to.emit(box, "StoredDataEvent");

    result = await box.verifyData(input)
    expect(result).to.be.true

    input.data1 = "different"
    result = await box.verifyData(input)
    expect(result).to.be.false

    input.eventId = 100
    result = await box.verifyData(input)
    expect(result).to.be.false
  })
})