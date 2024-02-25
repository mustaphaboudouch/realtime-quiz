import { Link, createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';
import {
	Button,
	Card,
	Flex,
	Grid,
	Group,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { IconEye, IconPlus, IconSearchOff } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Quiz } from '../types';

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
				<Button
					fullWidth
					leftSection={<IconEye size='1.2rem' />}
					component={Link}
					to={`/quizzes/${_id}`}
					preload={false}
				>
					View / Edit
				</Button>
			</Card>
		</Grid.Col>
	);
};

const Quizzes = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['quizzes'],
		queryFn: async () => {
			const response = await axios.get('http://127.0.0.1:3000/quizzes');
			return response.data;
		},
	});

	if (isLoading) return <h1>Loading...</h1>;

	if (error || !data) return <h1>Error</h1>;

	const quizzes = data as unknown as Quiz[];

	return (
		<Stack>
			<Group align='center' justify='space-between' mb='lg'>
				<Title order={1} size='1.8rem' lh='xl'>
					All quizzes
				</Title>
				<Button
					leftSection={<IconPlus size='1rem' />}
					component={Link}
					to='/quizzes/create'
					preload={false}
				>
					Create a quiz
				</Button>
			</Group>

			<Grid>
				{quizzes.map((quiz) => (
					<QuizCard key={quiz._id} {...quiz} />
				))}
			</Grid>

			{quizzes.length === 0 && (
				<Flex
					align='center'
					justify='center'
					h={150}
					style={{
						borderRadius: '0.5rem',
						border: '1px dashed #cccccc',
					}}
				>
					<Group align='center'>
						<IconSearchOff size='1.2rem' color='gray' />
						<Text c='dimmed'>No quizzes found !</Text>
					</Group>
				</Flex>
			)}
		</Stack>
	);
};

const QuizzesRoute = createRoute({
	path: '/quizzes',
	getParentRoute: () => AppLayoutRoute,
	component: Quizzes,
});

export { QuizzesRoute };
