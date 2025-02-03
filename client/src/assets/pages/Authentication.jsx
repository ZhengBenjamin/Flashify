import Header from '../components/jsx/Header';
import LoginCard from '../components/jsx/LoginCard';
import RegisterCard from '../components/jsx/RegisterCard';

import { Container, Title, Text, Anchor } from '@mantine/core';

export default function Authentication() {
  return (
    <div>
      <Header />
        <Container size={420} my={40}>
    
          <Title ta="center">
            Login to Flashify:
          </Title>
    
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            No account?{' '}
            <Anchor size="sm" component="button">
              Create One!
            </Anchor>
          </Text>

          <RegisterCard />
        </Container>
    </div>
  );
}