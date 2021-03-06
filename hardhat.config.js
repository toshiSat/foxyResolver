// require("dotenv");
require("@nomiclabs/hardhat-waffle");
// dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
console.log('doten', process.env.MAINNET_URL)
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100000,
      },
    },
  },
  networks: {
    hardhat: {
      deploy: [],
      chainId: 1,
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/CDf_84N-bbVsyODpzmL_ahJwyrZvsTb7",
        enabled: true, // Set to false to disable forked mainnet mode
      }
    },
    mainnet: {
      url: process.env.MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [process.env.PRIVATE_KEY]
          : [],
    },
  },
};
