import React, { useState, useEffect, useContext } from 'react';
import { Grid, Container, Title, Modal } from '@mantine/core';
import { UserContext } from '../../App';
import SubjectNavbar from '../components/jsx/SubjectNavbar';
import QuizHistory from '../components/jsx/QuizHistory';
import Events from '../components/jsx/Events';
import SubjectDashboard from '../components/jsx/SubjectDashboard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
// import AuthContext from '.../context/AuthContext';

export default function Study() {

  const quizHistory = [
    { subject: 'math', date: '69420-02-25', score: 85 },
    { subject: 'science', date: '2012-02-20', score: 92 },
    { subject: 'history', date: '2077-02-15', score: 78 },
  ];

  const events = [
    {
      name: 'Math Quiz - Algebra',
      date: '2024-03-05',
      time: '10:00 AM',
      description: 'Test your knowledge of Algebraic equations.',
      location: 'Online',
    },
    {
      name: 'Science Lecture - Physics',
      date: '2024-03-10',
      time: '2:00 PM',
      description: 'Join us for a detailed lecture on the basics of Physics.',
      location: 'Room 203',
    },
  ];

  const { username } = useContext(UserContext);
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showRedirectModal, setRedirectModal] = useState(false);

  useEffect(() => { // Redirects user to login if not logged in
    if (!username) {
      setRedirectModal(true);
      setTimeout(() => {
        setRedirectModal(false);
        navigate('/auth');
      }, 3000); 
    }
  }, [username, navigate]);

  // adding subject API
  const addSubject = async ({ subjectName, color }) => {
    try {
      const colorNumber = parseInt(color.replace("#", ""), 16);
      const newSubjectData = {
        subject_id: uuidv4(),
        username,
        subjectName,
        color: colorNumber,
      };

      console.log("📤 Sending subject to backend:", newSubjectData); // Debug log

      const res = await axios.post("http://localhost:4000/api/subject/create", newSubjectData);

      const createdSubject = res.data;

      setSubjects((prev) => [
        ...prev,
        {
          id: createdSubject.subject_id,
          name: createdSubject.subjectName,
          color: `#${createdSubject.color.toString(16).padStart(6, '0')}`,
        },
      ]);
    } catch (err) {
      console.error("❌ Failed to create subject:", err.response?.data || err.message || err);
      alert("Error creating subject. Please try again.");
    }
  };
  
  
// fetching subject API
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!username) return;
      try {
        const res = await axios.get(`http://localhost:4000/api/subject/${username}`);
        const subjectList = res.data.map((s) => ({
          id: s.subject_id,
          name: s.subjectName,
          color: `#${s.color.toString(16).padStart(6, '0')}`,
        }));
        setSubjects(subjectList);
      } catch (err) {
        console.error("❌ Failed to fetch subjects:", err.response?.data || err.message || err);
      }
    };
  
    fetchSubjects();
  }, [username]);

// Handle deleting a subject
const deleteSubject = async (id) => {
  try {
    await axios.delete(`http://localhost:4000/api/subject/${id}`);
    // Remove subject from local state after deletion
    setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject.id !== id));
  } catch (err) {
    console.error("Error deleting subject:", err);
    alert("Failed to delete subject.");
  }
};

// Handle editing a subject
const editSubject = async (id, updatedSubject) => {
  try {
    const res = await axios.put(`http://localhost:4000/api/subject/${id}`, updatedSubject);
    const updated = res.data;

    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.id === id ? { ...subject, name: updated.subjectName, color: updated.color } : subject
      )
    );
  } catch (err) {
    console.error("Error updating subject:", err);
    alert("Failed to update subject.");
  }
};

  return (
    <Container my="xl">
      <Title order={1}>Welcome to your dashboard, {username}!</Title>
      <br/>
      <Grid>
        <Grid.Col span={4}>
          <SubjectNavbar 
            subjects={subjects}
            onSubjectSelect={(subject) => setSelectedSubject(subject)}
            onAddSubject={addSubject}
            onSubjectDeleted={deleteSubject}
            onEditSubject={editSubject}
          />
        </Grid.Col>

        <Grid.Col span={8}>
          {selectedSubject ? (  // Subject dashboard when user clicks a subject
            console.log("Selected subject:", selectedSubject.id),
            <SubjectDashboard 
              subject={selectedSubject} 
              key={selectedSubject.id} 
            />
          ) : ( // Default view when no subject is selected
            <> 
              <Title order={2}>Select a subject from the left to view your decks!</Title>

              <QuizHistory quizzes={quizHistory} />
            </>
          )}
        </Grid.Col>
      </Grid>

      <Modal
        opened={showRedirectModal}
        onClose={() => {}}
        title="Authentication Required"
        centered
      >
        <Title order={5}>You must be signed in to visit this page. Redirecting to the Login Page...</Title>
      </Modal>

    </Container>
  );
}
