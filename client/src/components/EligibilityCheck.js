import React, { useState } from 'react';

const EligibilityCheck = ({ checkEligibility, isUserRegistered }) => {
  const [username, setUsername] = useState('');
  const [eligible, setEligible] = useState(null);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(null);

  const handleCheck = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const isRegistered = await isUserRegistered(username);
      setRegistered(isRegistered);
      if (!isRegistered) {
        setError('User is not registered');
        return;
      }
      const isEligible = await checkEligibility(username);
      setEligible(isEligible);
    } catch (error) {
      setError('An error occurred while checking eligibility');
    }
  };

  return (
    <div>
      <form onSubmit={handleCheck}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Check Eligibility</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {registered !== null && !registered && (
        <p>User is not registered</p>
      )}
      {eligible !== null && (
        <p>{eligible ? 'Eligible for A-rated movies' : 'Not eligible for A-rated movies'}</p>
      )}
    </div>
  );
};

export default EligibilityCheck;
