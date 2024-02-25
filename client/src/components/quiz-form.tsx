import {
	ActionIcon,
	Button,
	Card,
	Group,
	NumberInput,
	Stack,
	Switch,
	TextInput,
} from '@mantine/core';
import { Quiz } from '../types';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { useNavigate } from '@tanstack/react-router';

type QuizFormProps = {
	quiz: Quiz;
};

const schema = z.object({
	name: z.string().min(1),
	questions: z
		.array(
			z.object({
				points: z.number().min(0),
				question: z.string().min(1),
				answers: z
					.array(
						z.object({
							answer: z.string().min(1),
							isCorrect: z.boolean(),
						}),
					)
					.min(1),
			}),
		)
		.min(1),
});

const defaultAnswer = {
	answer: '',
	isCorrect: false,
};

const defaultQuestion = {
	points: 1,
	question: '',
	answers: [defaultAnswer],
};

const QuizForm = ({ quiz }: QuizFormProps) => {
	const navigate = useNavigate({ from: '/quizzes/$id' });
	const queryClients = useQueryClient();

	const form = useForm({
		initialValues: {
			name: quiz.name,
			questions: quiz.questions,
		},
		validate: zodResolver(schema),
	});

	const mutation = useMutation({
		mutationFn: async (data: unknown) => {
			return axios.patch(`http://127.0.0.1:3000/quizzes/${quiz._id}`, data, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('jwt-token'),
				},
			});
		},
		onSuccess: () => {
			queryClients.invalidateQueries({ queryKey: ['quizzes', quiz._id] });
			notifications.show({
				message: 'Quiz updated successfully',
			});
			navigate({ to: '/' });
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
			mutation.mutate(form.values);
		}
	}

	function canDeleteQuestion() {
		return form.values.questions?.length > 1;
	}

	function canDeleteAnswer(questionIndex: number) {
		return form.values.questions[questionIndex].answers?.length > 1;
	}

	return (
		<Stack pb='xl'>
			<TextInput
				label='Name'
				placeholder='Name'
				withAsterisk
				{...form.getInputProps('name')}
			/>

			{form.values.questions.map((_, i) => (
				<Card key={i} p='lg' radius='md' withBorder bg='#f8f8f8'>
					<Stack>
						<Group align='flex-end'>
							<TextInput
								flex={1}
								label={`Question ${i + 1}`}
								placeholder={`Question ${i + 1}`}
								withAsterisk
								{...form.getInputProps(`questions.${i}.question`)}
							/>
							<NumberInput
								label='Points'
								placeholder='Points'
								withAsterisk
								{...form.getInputProps(`questions.${i}.points`)}
							/>
							<ActionIcon
								color='red'
								size='lg'
								onClick={() => form.removeListItem('questions', i)}
								disabled={!canDeleteQuestion()}
							>
								<IconTrash size='1rem' />
							</ActionIcon>
						</Group>

						<Card p='lg' radius='md' withBorder bg='#ffffff'>
							<Stack>
								{form.values.questions[i].answers.map((_, j) => (
									<Group key={j} align='center' gap='lg'>
										<TextInput
											flex={1}
											size='xs'
											placeholder={`Answer ${j + 1}`}
											withAsterisk
											{...form.getInputProps(
												`questions.${i}.answers.${j}.answer`,
											)}
										/>
										<Switch
											label='Is correct ?'
											size='xs'
											defaultChecked={
												form.values.questions[i].answers[j].isCorrect
											}
											{...form.getInputProps(
												`questions.${i}.answers.${j}.isCorrect`,
											)}
										/>
										<ActionIcon
											color='red'
											size='md'
											disabled={!canDeleteAnswer(i)}
											onClick={() =>
												form.removeListItem(`questions.${i}.answers`, j)
											}
										>
											<IconTrash size='1rem' />
										</ActionIcon>
									</Group>
								))}

								<Group justify='flex-end'>
									<Button
										variant='default'
										size='xs'
										leftSection={<IconPlus size='1rem' />}
										onClick={() =>
											form.insertListItem(
												`questions.${i}.answers`,
												defaultAnswer,
											)
										}
									>
										Add a answer
									</Button>
								</Group>
							</Stack>
						</Card>
					</Stack>
				</Card>
			))}

			<Group justify='flex-end'>
				<Button
					variant='default'
					leftSection={<IconPlus size='1rem' />}
					onClick={() => form.insertListItem('questions', defaultQuestion)}
				>
					Add a question
				</Button>

				<Button onClick={onSubmit}>Save</Button>
			</Group>
		</Stack>
	);
};

export { QuizForm };
