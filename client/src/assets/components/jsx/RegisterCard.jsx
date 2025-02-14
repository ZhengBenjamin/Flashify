import { useState } from "react";
import { Paper, TextInput, PasswordInput, Button, Group } from "@mantine/core";

export default function LoginCard() {
import {
  Anchor,
  Button,
  Group,
  Paper,
  PasswordInput,
  TextInput,
} from '@mantine/core';

export default function LoginCard() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("david url here", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }
      alert("Signup successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Username" placeholder="Username" name="username" value={formData.username} onChange={handleChange} required />
        <TextInput label="Email" placeholder="example@flashify.com" name="email" value={formData.email} onChange={handleChange} required mt="md" />
        <PasswordInput label="Password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required mt="md" />
        <PasswordInput label="Repeat Password" placeholder="Repeat Password" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} required mt="md" />
        <Group justify="space-between" mt="md" />
        <Button fullWidth mt="xl" onClick={handleSubmit}>
          Sign Up
        </Button>
      </Paper>
    </div>
  );
}
