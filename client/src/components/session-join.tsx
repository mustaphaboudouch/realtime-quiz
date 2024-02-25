import { Button, Stack, TextInput, Title } from '@mantine/core';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';

const schema = z.object({
	code: z.string().min(1),
});

const SessionJoin = () => {
	const form = useForm({
		initialValues: {
			code: '',
		},
		validate: zodResolver(schema),
	});

	function onSubmit() {
		const validation = form.validate();
		if (!validation.hasErrors) {
			console.log(form.values);
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

export { SessionJoin };
