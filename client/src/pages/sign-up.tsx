import { Link, createRoute, useNavigate } from '@tanstack/react-router';
import {
	Anchor,
	Button,
	Group,
	PasswordInput,
	Radio,
	Stack,
	TextInput,
	Title,
} from '@mantine/core';
import { IconLock, IconUser } from '@tabler/icons-react';
import { z } from 'zod';
import { AuthLayoutRoute } from '../layouts/auth-layout';
import { useForm, zodResolver } from '@mantine/form';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';

const schema = z
	.object({
		role: z.enum(['ADMIN', 'CLIENT']),
		username: z.string().min(4),
		password: z.string().min(6),
		passwordConfirm: z.string().min(6),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords do not match',
		path: ['passwordConfirm'],
	});

const SignUp = () => {
	const navigate = useNavigate({ from: '/sign-up' });

	const form = useForm({
		initialValues: {
			role: 'CLIENT',
			username: '',
			password: '',
			passwordConfirm: '',
		},
		validate: zodResolver(schema),
	});

	const mutation = useMutation({
		mutationFn: async (data: unknown) => {
			return axios.post('http://127.0.0.1:3000/sign-up', data);
		},
		onSuccess: () => {
			notifications.show({
				title: 'Signed up successfully',
				message: 'Sign in with your username and password',
			});
			navigate({ to: '/sign-in' });
		},
		onError: () => {
			notifications.show({
				message: 'Invalid inputs',
				color: 'red',
			});
		},
	});

	function onSubmit() {
		const validation = form.validate();
		if (!validation.hasErrors) {
			const { passwordConfirm: _, ...values } = form.values;
			mutation.mutate(values);
		}
	}

	return (
		<Stack>
			<Title order={1} size='1.8rem' mb='xs'>
				Sign up
			</Title>

			<Radio.Group
				label='Sign up as'
				withAsterisk
				{...form.getInputProps('role')}
			>
				<Group mt='xs' gap='xl'>
					<Radio value='ADMIN' label='Admin' />
					<Radio value='CLIENT' label='Client' />
				</Group>
			</Radio.Group>
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
			<PasswordInput
				label='Confirmer le mot de passe'
				placeholder='Confirmer le mot de passe'
				leftSection={<IconLock size='1rem' />}
				withAsterisk
				{...form.getInputProps('passwordConfirm')}
			/>

			<Button mt='xs' onClick={onSubmit} loading={mutation.isPending}>
				Sign Up
			</Button>

			<Anchor
				component={Link}
				preload={false}
				to='/sign-in'
				size='sm'
				style={{ textAlign: 'center' }}
			>
				I already have an account
			</Anchor>
		</Stack>
	);
};

const SignUpRoute = createRoute({
	path: '/sign-up',
	getParentRoute: () => AuthLayoutRoute,
	component: SignUp,
});

export { SignUpRoute };
