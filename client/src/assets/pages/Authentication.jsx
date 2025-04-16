import React, { useState } from 'react';
import { Container, Title, Text, Anchor, Paper, Box } from '@mantine/core';
import LoginCard from '../components/jsx/LoginCard';
import RegisterCard from '../components/jsx/RegisterCard';

export default function Authentication() {
  const [login, setLogin] = useState(true);

  const toggleAuthMode = () => {
    setLogin((prev) => !prev);
  };

  return (
    <div style={{ backgroundColor: '#4c6ef5', height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper
        shadow="md"
        radius="md"
        p="xl"
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e0e0e0',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          width: '500px',
        }}
      >
        <Title align="center" style={{ color: '#4c6ef5' }}>
          {login ? 'Welcome Back!' : 'Create an Account!'}
        </Title>
        <Text align="center" size="sm" mt="md" style={{ color: '#6c757d' }}>
          {login ? 'No account? ' : 'Already have an account? '}
          <Anchor size="sm" component="button" onClick={toggleAuthMode} style={{ color: '#4c6ef5' }}>
            {login ? 'Create One' : 'Log in'}
          </Anchor>
        </Text>
        <Box mt="xl">{login ? <LoginCard /> : <RegisterCard />}</Box>
      </Paper>
    </div>
  );
}