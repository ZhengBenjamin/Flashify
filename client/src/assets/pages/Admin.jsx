import React, { useState, useEffect } from 'react';
import { Grid, Container, Title } from '@mantine/core';
import AdminNavbar from '../components/jsx/AdminNavbar';
import AdminUserDashboard from '../components/jsx/AdminUserDashboard';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch all users (no specific username in this case)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container my="xl">
      <Title order={1}>Welcome Admin!</Title>
      <br />
      <Grid>
        <Grid.Col span={4}>
          <AdminNavbar users={users} onUserSelect={setSelectedUser} />
        </Grid.Col>

        <Grid.Col span={8}>
          {selectedUser ? (
            <AdminUserDashboard user={selectedUser} />
          ) : (
            <Title order={2}>Select a User</Title>
          )}
        </Grid.Col>
      </Grid>
    </Container>
  );
}