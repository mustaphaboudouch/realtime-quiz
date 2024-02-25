import { Button, Stack, TextInput, Title } from '@mantine/core';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { AppLayoutRoute } from '../layouts/app-layout';
import { createRoute } from '@tanstack/react-router';

const schema = z.object({
	code: z.string().min(1),
});

const socket = io('http://localhost:3000', {
	auth: {
		token: 'Bearer ' + localStorage.getItem('jwt-token'),
	},
});

const SessionJoin = () => {
	const form = useForm({
		initialValues: {
			code: '',
		},
		validate: zodResolver(schema),
	});

	useEffect(() => {
		socket.connect();

		socket.on('SESSION_JOIN_ERROR', (error: string) => {
			notifications.show({
				message: error,
			});
		});

		socket.on('SESSION_JOIN_SUCCESS', () => {
			console.log('JOINED');
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	function onSubmit() {
		const validation = form.validate();
		if (!validation.hasErrors) {
			socket.emit('SESSION_JOIN', form.values.code);
		}
	}

	return (
		<Stack>
			<Title order={1} size='1.8rem' lh='xl'>
				Join a session
			</Title>

			<Stack>
				<TextInput
					label='Session code'
					placeholder='Session code'
					withAsterisk
					{...form.getInputProps('code')}
				/>
				<Button onClick={onSubmit}>Join session</Button>
			</Stack>
		</Stack>
	);
};

const SessionJoinRoute = createRoute({
	path: '/sessions/join',
	getParentRoute: () => AppLayoutRoute,
	component: SessionJoin,
});

export { SessionJoinRoute };
