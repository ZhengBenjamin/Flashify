import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from '../components/jsx/Header';
import SubjectNavbar from '../components/jsx/SubjectNavbar';
import QuizHistory from '../components/jsx/QuizHistory';
import Events from '../components/jsx/Events';

// TODO: Link to DB both are example data
const subjects = [
  { name: 'Math', description: 'Mathematics Subject', link: '/math' },
  { name: 'Science', description: 'Science Subject', link: '/science' },
  { name: 'History', description: 'History Subject', link: '/history' },
];

const quizHistory = [
  { subject: 'Math', date: '69420-02-25', score: 85 },
  { subject: 'Science', date: '2012-02-20', score: 92 },
  { subject: 'History', date: '2077-02-15', score: 78 },
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
  {
    name: 'History Exam - Ancient Civilizations',
    date: '2024-03-12',
    time: '1:00 PM',
    description: 'Final exam covering Ancient Civilizations.',
    location: 'Online',
  },
  {
    name: 'Math Lesson - Trigonometry',
    date: '2024-03-15',
    time: '11:00 AM',
    description: 'Learn the fundamentals of Trigonometry and its applications.',
    location: 'Room 101',
  },
  {
    name: 'Science Quiz - Chemistry',
    date: '2024-03-20',
    time: '9:00 AM',
    description: 'Test your knowledge of the periodic table and chemical reactions.',
    location: 'Online',
  },
];


export default function Study() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={<Header />}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <SubjectNavbar subjects={subjects} />
      </AppShell.Navbar>

      <AppShell.Main>
        {/* Todo: Add flashcards + features */}
        
        {/* Quiz History Section */}
        <QuizHistory quizzes={quizHistory} />
        <Events events={events} />
      </AppShell.Main>
    </AppShell>
  );
}
