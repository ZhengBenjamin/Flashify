/**
 * RegisterCard component for user registration.
 * Handles input validation and submits registration data to the backend.
 * @returns {JSX.Element} The registration form.
 */
import { useState } from 'react';
import axios from 'axios';
import { Button, Group, Paper, PasswordInput, TextInput, Text } from '@mantine/core';

export default function RegisterCard() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.repeatPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      await axios.post('http://localhost:4000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert('Signup successful!');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Paper
      withBorder
      shadow="md"
      p="xl"
      radius="md"
      style={{
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <TextInput
        label="Username"
        placeholder="Enter your username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
        style={{ marginBottom: '1.5rem', width: '100%' }}
      />
      <TextInput
        label="Email"
        placeholder="Enter your email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        style={{ marginBottom: '1.5rem', width: '100%' }}
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        style={{ marginBottom: '1.5rem', width: '100%' }}
      />
      <PasswordInput
        label="Repeat Password"
        placeholder="Repeat your password"
        name="repeatPassword"
        value={formData.repeatPassword}
        onChange={handleChange}
        required
        style={{ marginBottom: '1.5rem', width: '100%' }}
      />
      {error && <Text color="red" size="sm" style={{ marginBottom: '1.5rem' }}>{error}</Text>}
      <Group position="apart" mt="lg" style={{ width: '100%' }}>
        <Button fullWidth onClick={handleSubmit} style={{ backgroundColor: '#4c6ef5', color: 'white', padding: '0.75rem' }}>
          Sign Up
        </Button>
      </Group>
    </Paper>
  );
}
