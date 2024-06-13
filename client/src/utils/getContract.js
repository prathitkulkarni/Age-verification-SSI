// import Web3 from 'web3';
import AgeVerification from '../AgeVerification.json';

const getContract = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = AgeVerification.networks[networkId];
  const contract = new web3.eth.Contract(
    AgeVerification.abi,
    deployedNetwork && deployedNetwork.address,
  );
  return contract;
};

export default getContract;
