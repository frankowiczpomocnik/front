// src/components/TokenActions.jsx
import { useState } from 'react';
import axios from 'axios';

export default function TokenActions() {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const generateToken = async () => {
    try {
      const response = await axios.post('http://localhost:3000/generate-token', {}, {
        withCredentials: true,  // Обязательно для отправки cookies
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error generating token');
    }
  };

  const checkToken = async () => {
    try {
      const response = await axios.get('http://localhost:3000/check-token', {
        withCredentials: true,  // Обязательно для отправки cookies
      });     
      setMessage(response.data.message);
      console.log(response.data.user);
      setUser(response.data.user.user);   
    } catch (error) {
      setMessage('Token is invalid or not found');
    }
  };
   
  return (
    <div>
      <button onClick={generateToken}>Generate Token</button>
      <button onClick={checkToken}>Check Token</button>
      <p>{message}</p>
      {user && (
        <div>
          <p> {user.user}</p>         
        </div>
      )}
    </div>
  );
}
