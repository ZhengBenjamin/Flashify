import React, { useState, useEffect, useContext } from 'react';
import { Grid, Container } from '@mantine/core';
import { UserContext } from '../../App';
import SubjectNavbar from '../components/jsx/SubjectNavbar';
import QuizHistory from '../components/jsx/QuizHistory';
import Events from '../components/jsx/Events';
import SubjectDashboard from '../components/jsx/SubjectDashboard';
import axios from 'axios';
// import AuthContext from '.../context/AuthContext';

export default function Study() {
  const { username } = useContext(UserContext);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);

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

  useEffect(() => {
    if (username) {
      axios.get('/api/subjects?username=${username}')
      .then ((response) => {
        setSubjects(response.data.subjects);
      })
      .catch((error) => {
        console.error('Failed to fetch subjects:', error);
      });
    }
  }, [username]);

  // Send new subject to DB when user creates new subject; SAME HERE MODIFY SCHEMA WHEN API IMPLEMENTED
  const addSubject = async (newSubject) => {
    try {
      const response = await fetch('/api/subjects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSubject),
      });
      if (!response.ok) {
        throw new Error('Error adding subject');
      }
      const data = await response.json();
      // Append the newly created subject to the list
      setSubjects((prev) => [...prev, data.subject]);
    } catch (error) {
      console.error('Failed to add subject:', error);
    }
  };

  return (
    <Container my="xl">
      {/* <Grid>
        <h1>Subjects for {username}</h1>
        <Grid.Col span={4}>
          <SubjectNavbar 
            subjects={subjects} 
            onSubjectSelect={(subject) => setSelectedSubject(subject)}
            onAddSubject={addSubject}
          />
        </Grid.Col>

        <Grid.Col span={8}>
          {selectedSubject ? (
            <SubjectDashboard 
              subjectId={selectedSubject.id} 
            />
          ) : (
            <>
              <QuizHistory quizzes={quizHistory} />
              <Events events={events} />
            </>
          )}
        </Grid.Col>
      </Grid> */}
      {/* Don't delete my shit this actuall yowrks  */}
      
      <SubjectDashboard subjectId={1}/>

    </Container>
  );
}
