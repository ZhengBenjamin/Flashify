/**
 * Admin page for managing users and their data.
 * Displays a list of users and allows the admin to view user-specific dashboards.
 * @returns {JSX.Element} The admin page layout.
 */

import React, { useState, useEffect, useContext } from 'react';
import { Grid, Container, Title, Text } from '@mantine/core';
import AdminNavbar from '../components/jsx/AdminNavbar';
import AdminUserDashboard from '../components/jsx/AdminUserDashboard';
import { UserContext } from '../../App'; // adjust path as needed

export default function Admin() {
  const { role } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (role !== 'admin') return; // only fetch if role is admin
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
  }, [role]);

  // If not admin, block access
  if (role !== 'admin') {
    return (
      <Container my="xl">
        <Title order={2}>Access Denied</Title>
        <Text>You must be an admin to access this page.</Text>
      </Container>
    );
  }

  // Admin content
  return (
    <Container my="xl">
      <Title order={1}>Welcome Admin!</Title>
      <br />
      <Grid gutter={'xl'}>
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
