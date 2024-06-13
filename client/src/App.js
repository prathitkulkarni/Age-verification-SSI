import React, { useState, useEffect } from 'react';
import getWeb3 from './utils/getWeb3';
import getContract from './utils/getContract';
import RegistrationForm from './components/RegistrationForm';
import EligibilityCheck from './components/EligibilityCheck';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const contract = await getContract(web3);
      setContract(contract);

      if (contract) {
        // Check if contract is defined and set up correctly
        console.log("Contract:", contract);
        // Remove event listener for now as it seems to be causing issues
      }
    };
    init();
  }, []);

  const registerUser = async (username, name, birthYear) => {
    try {
      const gasPrice = await web3.eth.getGasPrice();
      await contract.methods.registerUser(username, name, birthYear).send({
        from: account,
        gasPrice: gasPrice,
      });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const checkEligibility = async (username) => {
    try {
      const isEligible = await contract.methods.isEligible(username).call();
      return isEligible;
    } catch (error) {
      console.error("Error checking eligibility:", error);
      return false;
    }
  };

  const isUserRegistered = async (username) => {
    try {
      const isRegistered = await contract.methods.isUserRegistered(username).call();
      return isRegistered;
    } catch (error) {
      console.error("Error checking user registration:", error);
      return false;
    }
  };

  return (
    <div>
      <h1>Age Verification System</h1>
      <RegistrationForm registerUser={registerUser} />
      <EligibilityCheck checkEligibility={checkEligibility} isUserRegistered={isUserRegistered} />
    </div>
  );
};

export default App;
