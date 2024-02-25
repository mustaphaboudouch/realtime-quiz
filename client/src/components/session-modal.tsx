import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import axios from 'axios';
import { z } from 'zod';

type SessionModal = {
	quizId: string;
};

const schema = z.object({
	code: z.string().min(1),
});

const SessionModal = ({ quizId }: SessionModal) => {
	const navigate = useNavigate({ from: '/' });
	const [opened, { open, close }] = useDisclosure(false);
	const queryClient = useQueryClient();

	const form = useForm({
		initialValues: {
			code: '',
		},
		validate: zodResolver(schema),
	});

	const mutation = useMutation({
		mutationFn: async (data: unknown) => {
			return axios.post('http://127.0.0.1:3000/sessions', data, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('jwt-token'),
				},
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['sessions'] });
			notifications.show({
				message: 'Session started successfully',
			});
			navigate({ to: '/sessions' });
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
			mutation.mutate({ ...form.values, quizId });
		}
	}

	return (
		<>
			<Modal opened={opened} onClose={close} title='Start a session'>
				<Stack>
					<TextInput
						label='Session code'
						placeholder='Session code'
						withAsterisk
						{...form.getInputProps('code')}
					/>
					<Button onClick={onSubmit}>Start session</Button>
				</Stack>
			</Modal>

			<Button flex={1} onClick={open}>
				Start a session
			</Button>
		</>
	);
};

export { SessionModal };
