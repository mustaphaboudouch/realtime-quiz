import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';
import { Stack, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Subscription } from '../types';
import { QuestionForm } from '../components/question-form';

const QuizPreview = ({}) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['subscriptions'],
		queryFn: async () => {
			const { data } = await axios.get(
				'http://127.0.0.1:3000/subscriptions/current',
				{
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('jwt-token'),
					},
				},
			);
			return data;
		},
	});

	if (isLoading) return <h1>Loading...</h1>;

	if (error || !data) return <h1>Error</h1>;

	const subscription = data as unknown as Subscription;

	return (
		<Stack>
			<Title order={1} size='1.8rem' lh='xl'>
				Quiz
			</Title>

			<QuestionForm {...subscription} />
		</Stack>
	);
};

const QuizPreviewRoute = createRoute({
	path: '/sessions/preview',
	getParentRoute: () => AppLayoutRoute,
	component: QuizPreview,
});

export { QuizPreviewRoute };
