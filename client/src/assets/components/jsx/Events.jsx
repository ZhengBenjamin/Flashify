import { Card, Text, Group, Badge } from '@mantine/core';
import { FaCalendar } from "react-icons/fa";

export default function Events({ events }) {
  return (
    <Card shadow="sm" p="lg">
      <Text size="lg" weight={500}>Upcoming Events</Text>
      {events.map((event, index) => (
        <Group key={index} position="apart" mt="md">
          <Group>
            <FaCalendar size={18} />
            <Text>{event.name}</Text>
          </Group>
          <Badge color="orange">{event.date}</Badge>
        </Group>
      ))}
    </Card>
  );
}
