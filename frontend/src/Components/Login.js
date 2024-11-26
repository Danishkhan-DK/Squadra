import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

    const handleLogin = async () => {
      const user = { email, password };
    
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
    
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token); 
          alert('Login Successful!');
          navigate('/movies');
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (error) {
        alert('Error during login');
      }
    
    


  };

  return (
    <div>
        
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
