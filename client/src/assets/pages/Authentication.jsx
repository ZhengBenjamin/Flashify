import Header from '../components/jsx/Header';
import LoginCard from '../components/jsx/LoginCard';
import RegisterCard from '../components/jsx/RegisterCard';

import { useState } from 'react';
import { Container, Title, Text, Anchor } from '@mantine/core';

export default function Authentication() {

  const [login, setLogin] = useState(true);

  const toggleAuthMode = () => {
    setLogin((prev) => !prev);
  }

  return (
    <div>
      <Container size={420} my={40}>
    
          <Title ta="center">
            {login? 'Welcome Back!' : 'Create an Account!'}
          </Title>
    
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            {login? 'No account? ' : 'Already have an account? '}
            <Anchor size="sm" component="button" onClick={toggleAuthMode}>
              {login? 'Create One' : 'Log in'}
            </Anchor>
          </Text>

          {login? <LoginCard /> : <RegisterCard />}
        </Container>
    </div>
  );
}