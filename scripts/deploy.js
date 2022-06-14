const { ethers } = require("hardhat");

async function main() {
  const tokeManager = "0xa86e412109f77c45a3bc1c5870b880492fb86a14";
  const stakingContract = "0xee77aa3Fd23BbeBaf94386dD44b548e9a785ea4b";

  console.info("Deploying Resolver...");
  const resolverDeployment = await ethers.getContractFactory("Resolver");

  const resolver = await resolverDeployment.deploy(
    tokeManager,
    stakingContract
  );
  await resolver.deployed();
  console.info("Resolver deployed to:", resolver.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
