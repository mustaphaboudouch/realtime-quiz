import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';
import { Flex, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { IconSearchOff } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Session } from '../types';
import { SessionCard } from '../components/session-card';

const Sessions = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['sessions'],
		queryFn: async () => {
			const { data } = await axios.get('http://127.0.0.1:3000/sessions', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('jwt-token'),
				},
			});
			return data;
		},
	});

	if (isLoading) return <h1>Loading...</h1>;

	if (error || !data) return <h1>Error</h1>;

	const sessions = data as unknown as Session[];

	return (
		<Stack>
			<Group align='center' justify='space-between' mb='lg'>
				<Title order={1} size='1.8rem' lh='xl'>
					All sessions
				</Title>
			</Group>

			<Grid>
				{sessions.map((session) => (
					<SessionCard key={session._id} {...session} />
				))}
			</Grid>

			{sessions.length === 0 && (
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
						<Text c='dimmed'>No sessions found !</Text>
					</Group>
				</Flex>
			)}
		</Stack>
	);
};

const SessionsRoute = createRoute({
	path: '/sessions',
	getParentRoute: () => AppLayoutRoute,
	component: Sessions,
});

export { SessionsRoute };
