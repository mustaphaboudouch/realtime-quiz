import { Button, Card, Grid, Group, Text } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { Quiz } from '../types';
import { SessionModal } from './session-modal';

const QuizCard = ({ _id, name, questions }: Quiz) => {
	return (
		<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
			<Card padding='lg' radius='md' withBorder>
				<Text fw={500} mb='xs' truncate>
					{name}
				</Text>
				<Text size='sm' c='dimmed' mb='sm'>
					{`${questions.length} questions`}
				</Text>

				<Group>
					<SessionModal quizId={_id} />
					<Button
						variant='default'
						leftSection={<IconEdit size='1.2rem' />}
						component={Link}
						to={`/quizzes/${_id}`}
						preload={false}
					>
						Edit
					</Button>
				</Group>
			</Card>
		</Grid.Col>
	);
};

export { QuizCard };
