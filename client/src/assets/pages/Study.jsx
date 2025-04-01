import React, { useState, useEffect, useContext } from 'react';
import { Grid, Container, Title, Modal } from '@mantine/core';
import { UserContext } from '../../App';
import SubjectNavbar from '../components/jsx/SubjectNavbar';
import QuizHistory from '../components/jsx/QuizHistory';
import Events from '../components/jsx/Events';
import SubjectDashboard from '../components/jsx/SubjectDashboard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  // Initialize subjects as an empty array since we're fetching them from the API
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

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await axios.post('http://localhost:4000/api/subjects/user', {
          username
        });
        const subjectsData = Array.isArray(response.data)
          ? response.data
          : response.data.subjects;
        setSubjects(subjectsData || []);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    }
  
    if (username) fetchSubjects(); // only fetch if user is logged in
  }, [username]);

  // API call to add new subject
  const addSubject = async (newSubject) => {
    try {
      const response = await axios.post('http://localhost:4000/api/subjects', {
        ...newSubject,
        username
      });
      setSubjects(prevSubjects => [...prevSubjects, response.data]);
    } catch (error) {
      console.error('Error creating subject:', error);
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
          />
        </Grid.Col>

        <Grid.Col span={8}>
          {selectedSubject ? (  // Subject dashboard when user clicks a subject
            console.log("Selected subject:", selectedSubject.id),
            <SubjectDashboard 
              subjectId={selectedSubject.id} 
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
