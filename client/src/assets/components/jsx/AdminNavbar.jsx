import { useState } from 'react';
import { Paper, Stack, Title, TextInput, Button, Modal } from '@mantine/core';
import { ColorInput } from '@mantine/core';
import AdminUserButton from './AdminUserButton';
import classes from '../css/SubjectNavbar.module.css';

export default function AdminNavbar(props) {
  const { users, onUserSelect } = props;

  const [modalOpened, setModalOpened] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newUserColor, setNewUserColor] = useState('#ffffff');

  return (
    <>
      <Paper className={classes.navbar}>
        <Title order={4}>Available Users: </Title>
        <Stack justify="center" className={classes.stack}>
          {users.map((user, index) => (
            <AdminUserButton
              key={index}
              user={user.username}
              color={user.color}
              onClick={() => onUserSelect(user)}
            />
          ))}

        </Stack>
      </Paper>
    </>
  );
}
