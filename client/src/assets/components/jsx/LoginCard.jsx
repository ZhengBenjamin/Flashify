import { useState } from 'react';
import axios from 'axios';
import {
  Anchor,
  Button,
  Group,
  Paper,
  PasswordInput,
  TextInput,
} from '@mantine/core';

export default function LoginCard() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token); // Store JWT Token
      console.log('Login successful:', response.data);
      window.location.href = "/dashboard"; // Redirect after login (update route as needed)
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput 
          label="Username" 
          placeholder="Username" 
          required 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />
        <PasswordInput 
          label="Password" 
          placeholder="Password" 
          required 
          mt="md" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Group justify="space-between" mt="lg">
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={handleLogin}>
          Sign in
        </Button>
      </Paper>
    </div>
  );
}
