import { Flex, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { IconSearchOff } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SubscriptionEntity } from '../types';
import { SubscriptionCard } from './subscription-card';

const SubscriptionList = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['subscriptions'],
		queryFn: async () => {
			const { data } = await axios.get('http://127.0.0.1:3000/subscriptions', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('jwt-token'),
				},
			});
			return data;
		},
	});

	if (isLoading) return <h1>Loading...</h1>;

	if (error || !data) return <h1>Error</h1>;

	const subscriptions = data as unknown as SubscriptionEntity[];

	console.log('subscriptions', subscriptions);

	return (
		<Stack>
			<Group align='center' justify='space-between' mb='lg'>
				<Title order={1} size='1.8rem' lh='xl'>
					My Quizzes
				</Title>
			</Group>

			<Grid>
				{subscriptions.map((subscription) => (
					<SubscriptionCard key={subscription._id} {...subscription} />
				))}
			</Grid>

			{subscriptions.length === 0 && (
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

export { SubscriptionList };
