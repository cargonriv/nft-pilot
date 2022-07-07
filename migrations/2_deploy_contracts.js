const SmartContractName = "datalife";

const SmartContract = artifacts.require(SmartContractName);

module.exports = function (deployer) {
  deployer.deploy(SmartContract);
};