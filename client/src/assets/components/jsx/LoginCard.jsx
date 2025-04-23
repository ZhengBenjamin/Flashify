/**
 * LoginCard component to handle user login.
 * Sends credentials to the backend and stores authentication tokens.
 * @returns {JSX.Element} The login form.
 */
import { useState, useContext } from 'react';
import axios from 'axios';
import { Button, Group, Paper, PasswordInput, TextInput, Text } from '@mantine/core';
import { UserContext } from '../../../App';

export default function LoginCard() {
  // State to manage local username input
  const [localUsername, setLocalUsername] = useState('');
  // State to manage password input
  const [password, setPassword] = useState('');
  // State to manage error messages
  const [error, setError] = useState('');
  // Context to set global username and role
  const { setUsername, setRole } = useContext(UserContext);

  /**
   * Handles the login process by sending credentials to the backend.
   * On success, stores the token and user details in localStorage and updates context.
   * On failure, sets an error message.
   */
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        username: localUsername,
        password,
      });

      const { token, user } = response.data;

      // Store authentication token and user details in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('role', user.role);

      // Update global context with username and role
      setUsername(user.username);
      setRole(user.role);

      // Redirect to study interface
      window.location.href = '/studyinterface';
    } catch (err) {
      // Set error message if login fails
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Paper withBorder shadow="md" p="xl" radius="md" style={{ backgroundColor: '#f9f9f9' }}>
      {/* Input field for username */}
      <TextInput
        label="Username"
        placeholder="Enter your username"
        value={localUsername}
        onChange={(e) => setLocalUsername(e.currentTarget.value)}
        required
        style={{ marginBottom: '1.5rem' }}
      />
      {/* Input field for password */}
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        required
        style={{ marginBottom: '1.5rem' }}
      />
      {/* Display error message if login fails */}
      {error && <Text color="red" size="sm" style={{ marginBottom: '1.5rem' }}>{error}</Text>}
      <Group position="apart" mt="lg">
        {/* Button to trigger login */}
        <Button fullWidth onClick={handleLogin} style={{ backgroundColor: '#4c6ef5', color: 'white', padding: '0.75rem' }}>
          Log In
        </Button>
      </Group>
    </Paper>
  );
}
