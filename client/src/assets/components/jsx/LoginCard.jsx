import { useState, useContext } from 'react';
import axios from 'axios';
import {
  Anchor,
  Button,
  Group,
  Paper,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { UserContext } from '../../../App'; 


export default function LoginCard() {
  const [localUsername, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUsername, setRole } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        username: localUsername,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('role', user.role);

      setUsername(user.username);
      setRole(user.role);

      window.location.href = "/studyinterface";
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
          value={localUsername} 
          onChange={(e) => setLocalUsername(e.currentTarget.value)}
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
