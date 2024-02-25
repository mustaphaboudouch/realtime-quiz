import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';
import { Stack, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { QuizForm } from '../components/quiz-form';
import axios from 'axios';
import { Quiz } from '../types';

const QuizEdit = ({}) => {
	const { id } = QuizEditRoute.useParams();

	const { data, isLoading, error } = useQuery({
		queryKey: ['quizzes', id],
		queryFn: async () => {
			const { data } = await axios.get(`http://127.0.0.1:3000/quizzes/${id}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('jwt-token'),
				},
			});
			return data;
		},
	});

	if (isLoading) return <h1>Loading...</h1>;

	if (error || !data) return <h1>Error</h1>;

	const quiz = data as unknown as Quiz;

	return (
		<Stack>
			<Title order={1} size='1.8rem' lh='xl'>
				Edit quiz
			</Title>

			<QuizForm quiz={quiz} />
		</Stack>
	);
};

const QuizEditRoute = createRoute({
	path: '/quizzes/$id',
	getParentRoute: () => AppLayoutRoute,
	component: QuizEdit,
});

export { QuizEditRoute };
