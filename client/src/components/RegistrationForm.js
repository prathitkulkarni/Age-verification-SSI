import React, { useState } from 'react';

const RegistrationForm = ({ registerUser }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(username, name, birthYear);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Birth Year"
        value={birthYear}
        onChange={(e) => setBirthYear(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
