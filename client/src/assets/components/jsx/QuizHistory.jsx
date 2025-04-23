/**
 * QuizHistory component to display the user's quiz history.
 * @param {Object} props - Component props.
 * @param {Array} props.quizzes - Array of quiz objects.
 * @returns {JSX.Element} The quiz history display.
 */
import { Card, Text, Group, Title } from '@mantine/core';

export default function QuizHistory({ quizzes }) {
  if (!quizzes || quizzes.length === 0) {
    return <Text>No quiz history available.</Text>;
  }

  // Helper to determine background color based on score
  const getQuizColor = (score) => {
    if (score >= 90) return '#d4f3d4';   // greenish for high scores
    if (score >= 70) return '#fff4d4';   // yellowish for mid scores
    return '#f3d4d4';                   // reddish for low scores
  };

  return (
    <>
      <Card shadow="xl" p="md" >
        <Title order={2} style={{ paddingBottom: '25px' }}>Quiz History</Title>
        {quizzes.map((quiz, index) => (
          <Card
            key={index}
            withBorder
            shadow="sm"
            radius="md"
            p="md"
            mb="md"
            style={{ backgroundColor: getQuizColor(quiz.score) }}
          >
            <Text size="lg" weight={600}>
              {quiz.subject}
            </Text>
            <Group position="apart" mt="sm">
              <Text size="sm">
                Date: {new Date(quiz.date).toLocaleDateString()}
              </Text>
              <Text size="sm" weight={500}>
                Score: {quiz.score}%
              </Text>
            </Group>
          </Card>
        ))}
      </Card>
    </>
  );
}
