import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('');

  const navigate = useNavigate(); 

  const handleSignup = async () => {

    if (!name || !email || !password || !phone || !profession) {
      alert('All fields are mandatory!');
      return;
    }
    
    const user = { name, email, password, phone, profession };
  
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        alert('Signup Successful!');
        navigate('/login');
      } else {
        const data = await response.json();
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      alert('Error during signup');
    }

  

  };

  return (
    <div>
      <h2>Signup</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/><br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/><br />
      <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} /><br />
      <select value={profession} onChange={(e) => setProfession(e.target.value)}>
        <option value="">Select Profession</option>
        <option value="Engineer">Engineer</option>
        <option value="Doctor">Doctor</option>
        <option value="Teacher">Teacher</option>
        <option value="Other">Other</option>
      </select><br />
      <button onClick={handleSignup}>Signup</button>
      <button onClick={()=>navigate('/login')}>Login</button>
    </div>
  );
};

export default Signup;
