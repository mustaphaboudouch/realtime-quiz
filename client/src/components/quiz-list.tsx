import { Link } from '@tanstack/react-router';
import { Button, Flex, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { IconPlus, IconSearchOff } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Quiz } from '../types';
import { QuizCard } from '../components/quiz-card';

const QuizList = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['quizzes'],
		queryFn: async () => {
			const { data } = await axios.get('http://127.0.0.1:3000/quizzes', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('jwt-token'),
				},
			});
			return data;
		},
	});

	if (isLoading) return <h1>Loading...</h1>;

	if (error || !data) return <h1>Error</h1>;

	const quizzes = data as unknown as Quiz[];

	return (
		<Stack>
			<Group align='center' justify='space-between' mb='lg'>
				<Title order={1} size='1.8rem' lh='xl'>
					Quizzes
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

export { QuizList };
