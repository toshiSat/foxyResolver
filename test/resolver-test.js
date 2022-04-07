const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Resolver", function () {
  it("Should return whether or not user can batch", async function () {
    const Resolver = await ethers.getContractFactory("Resolver");
    const resolver = await Resolver.deploy(
      "0xA86e412109f77c45a3BC1c5870b880492Fb86A14",
      "0xee77aa3Fd23BbeBaf94386dD44b548e9a785ea4b"
    );
    await resolver.deployed();

    const { canExec } = await resolver.checker();
    console.log("canExec", canExec);
  });
});
