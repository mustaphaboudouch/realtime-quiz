import { Badge, Button, Card, Grid, Text } from '@mantine/core';
import { Session } from '../types';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';

const SessionCard = ({ _id, code, quizId, status }: Session) => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async () => {
			return axios.patch(`http://127.0.0.1:3000/sessions/${_id}`, undefined, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('jwt-token'),
				},
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['sessions'] });
			notifications.show({
				message: 'Session stoped successfully',
			});
		},
		onError: () => {
			notifications.show({
				message: 'Invalid inputs',
				color: 'red',
			});
		},
	});

	function onSubmit() {
		mutation.mutate();
	}

	return (
		<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
			<Card padding='lg' radius='md' withBorder>
				<Badge>{status}</Badge>
				<Text fw={500} mb='xs' mt='sm' truncate>
					Quiz : {quizId.name}
				</Text>
				<Text size='sm' c='dimmed' mb='lg'>
					Code : {code}
				</Text>
				<Button onClick={onSubmit} disabled={status === 'EXPIRED'}>
					Stop session
				</Button>
			</Card>
		</Grid.Col>
	);
};

export { SessionCard };
