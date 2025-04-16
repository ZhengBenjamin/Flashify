import { useState, useContext } from 'react';
import axios from 'axios';
import { Button, Group, Paper, PasswordInput, TextInput, Text } from '@mantine/core';
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

      window.location.href = '/studyinterface';
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Paper withBorder shadow="md" p="xl" radius="md" style={{ backgroundColor: '#f9f9f9' }}>
      <TextInput
        label="Username"
        placeholder="Enter your username"
        value={localUsername}
        onChange={(e) => setLocalUsername(e.currentTarget.value)}
        required
        style={{ marginBottom: '1.5rem' }}
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        required
        style={{ marginBottom: '1.5rem' }}
      />
      {error && <Text color="red" size="sm" style={{ marginBottom: '1.5rem' }}>{error}</Text>}
      <Group position="apart" mt="lg">
        <Button fullWidth onClick={handleLogin} style={{ backgroundColor: '#4c6ef5', color: 'white', padding: '0.75rem' }}>
          Log In
        </Button>
      </Group>
    </Paper>
  );
}
