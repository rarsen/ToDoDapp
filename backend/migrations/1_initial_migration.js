const taskContract = artifacts.require("taskContract");

module.exports = function(deployer) {
  deployer.deploy(taskContract);
};
