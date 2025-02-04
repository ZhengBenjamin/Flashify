import {
  Anchor,
  Button,
  Group,
  Paper,
  PasswordInput,
  TextInput,
} from '@mantine/core';

export default function LoginCard() {
  return (
    <div>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Username" placeholder="Username" required />
        <TextInput label="Email" placeholder="example@flashify.com" required mt="md" />
        <PasswordInput label="Password" placeholder="Password" required mt="md" />
        <PasswordInput label="Repeat Password" placeholder="Repeat Password" required mt="md" />
        <Group justify="space-between" mt="md">
        </Group>
        <Button fullWidth mt="xl">
          Sign Up
        </Button>
      </Paper>
    </div>
  );
}