import { Card, Table, Title, Text, Paper } from '@mantine/core';

export default function History({ quizzes }) {
  return (
    <Paper shadow="md" radius="md" p="lg">
      <Title order={2} mb="md">Quiz History</Title>
      
      {quizzes.length > 0 ? (
        <Table highlightOnHover withBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Subject</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Score</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {quizzes.map((quiz, index) => (
              <Table.Tr key={index}>
                <Table.Td>{quiz.subject}</Table.Td>
                <Table.Td>{new Date(quiz.date).toLocaleDateString()}</Table.Td>
                <Table.Td>{quiz.score}%</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      ) : (
        <Text>No quiz history available.</Text>
      )}
    </Paper>
  );
}
