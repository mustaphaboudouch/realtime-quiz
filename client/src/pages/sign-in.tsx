import { Link, createRoute } from '@tanstack/react-router';
import {
	Anchor,
	Button,
	PasswordInput,
	Stack,
	TextInput,
	Title,
} from '@mantine/core';
import { IconLock, IconUser } from '@tabler/icons-react';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { z } from 'zod';
import { AuthLayoutRoute } from '../layouts/auth-layout';
import { useLocalStorage } from '@mantine/hooks';

const schema = z.object({
	username: z.string().min(4),
	password: z.string().min(6),
});

const SignIn = () => {
	const [_value, setValue] = useLocalStorage({ key: 'jwt-token' });

	const form = useForm({
		initialValues: {
			username: '',
			password: '',
		},
		validate: zodResolver(schema),
	});

	const mutation = useMutation({
		mutationFn: async (data: unknown) => {
			return axios.post('http://127.0.0.1:3000/sign-in', data);
		},
		onSuccess: (value) => {
			setValue(value.data.token);
			window.location.reload();
		},
		onError: () => {
			notifications.show({
				message: 'Invalid credentials',
				color: 'red',
			});
		},
	});

	function onSubmit() {
		const validation = form.validate();
		if (!validation.hasErrors) {
			mutation.mutate(form.values);
		}
	}

	return (
		<Stack>
			<Title order={1} size='1.8rem' mb='xs'>
				Sign in
			</Title>

			<TextInput
				label='Username'
				placeholder='Username'
				leftSection={<IconUser size='1rem' />}
				withAsterisk
				{...form.getInputProps('username')}
			/>
			<PasswordInput
				label='Password'
				placeholder='Password'
				leftSection={<IconLock size='1rem' />}
				withAsterisk
				{...form.getInputProps('password')}
			/>

			<Button mt='xs' onClick={onSubmit} loading={mutation.isPending}>
				Sign In
			</Button>

			<Anchor
				component={Link}
				preload={false}
				to='/sign-up'
				size='sm'
				style={{ textAlign: 'center' }}
			>
				Create a new account
			</Anchor>
		</Stack>
	);
};

const SignInRoute = createRoute({
	path: '/sign-in',
	getParentRoute: () => AuthLayoutRoute,
	component: SignIn,
});

export { SignInRoute };
