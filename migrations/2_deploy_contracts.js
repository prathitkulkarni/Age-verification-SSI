const AgeVerification = artifacts.require("AgeVerification");

module.exports = function (deployer) {
  deployer.deploy(AgeVerification);
};
