import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';
import { Group, Stack, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SubscriptionEntity } from '../types';
import { IconCircleCheck, IconCircleCheckFilled } from '@tabler/icons-react';

const QuizDetails = () => {
	const { id } = QuizDetailsRoute.useParams();

	const { data, isLoading, error } = useQuery({
		queryKey: ['subscriptions', id],
		queryFn: async () => {
			const { data } = await axios.get(
				`http://127.0.0.1:3000/subscriptions/${id}`,
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

	const subscription = data as unknown as SubscriptionEntity;

	return (
		<Stack>
			<Title order={1} size='1.8rem' lh='xl'>
				My Quiz
			</Title>

			{subscription.questions.map((question, i) => (
				<Stack key={i}>
					<Title order={3} mb='xs' mt='lg'>
						{question.question}
					</Title>
					{question.answers.map((answer, j) => (
						<Stack key={j}>
							<Group>
								{answer.isSelected ? (
									<IconCircleCheckFilled />
								) : (
									<IconCircleCheck />
								)}
								<Text>{answer.answer}</Text>
							</Group>
						</Stack>
					))}
				</Stack>
			))}
		</Stack>
	);
};

const QuizDetailsRoute = createRoute({
	path: '/subscriptions/$id',
	getParentRoute: () => AppLayoutRoute,
	component: QuizDetails,
});

export { QuizDetailsRoute };
