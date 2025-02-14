import { useState } from "react";
import axios from "axios";
import { Paper, TextInput, PasswordInput, Button, Group } from "@mantine/core";

export default function RegisterCard() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.repeatPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert("Signup successful!");
      console.log("Signup response:", response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput 
          label="Username" 
          placeholder="Username" 
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
          required 
        />
        <TextInput 
          label="Email" 
          placeholder="example@flashify.com" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          mt="md" 
        />
        <PasswordInput 
          label="Password" 
          placeholder="Password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
          mt="md" 
        />
        <PasswordInput 
          label="Repeat Password" 
          placeholder="Repeat Password" 
          name="repeatPassword" 
          value={formData.repeatPassword} 
          onChange={handleChange} 
          required 
          mt="md" 
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Group justify="space-between" mt="md" />
        <Button fullWidth mt="xl" onClick={handleSubmit}>
          Sign Up
        </Button>
      </Paper>
    </div>
  );
}
