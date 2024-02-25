import { createRoute, useNavigate } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';
import {
	ActionIcon,
	Button,
	Card,
	Group,
	NumberInput,
	Stack,
	Switch,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

const QuizCreate = () => {
	const navigate = useNavigate({ from: '/quizzes/create' });
	const queryClients = useQueryClient();

	const form = useForm({
		initialValues: {
			name: '',
			questions: [defaultQuestion],
		},
		validate: zodResolver(schema),
	});

	const mutation = useMutation({
		mutationFn: async (data: unknown) => {
			return axios.post('http://127.0.0.1:3000/quizzes', data);
		},
		onSuccess: () => {
			queryClients.invalidateQueries({ queryKey: ['quizzes'] });
			notifications.show({
				message: 'Quiz created successfully',
			});
			navigate({ to: '/quizzes' });
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
			console.log(form.values);
		}
	}

	function canDeleteQuestion() {
		return form.values.questions?.length > 1;
	}

	function canDeleteAnswer(questionIndex: number) {
		return form.values.questions[questionIndex].answers?.length > 1;
	}

	return (
		<Stack>
			<Title order={1} size='1.8rem' lh='xl'>
				Create a quiz
			</Title>

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
												{...form.getInputProps(
													`questions.${i}.answers.${j}.isCorrect`,
												)}
											/>
											<ActionIcon
												color='red'
												size='md'
												disabled={!canDeleteAnswer(i)}
												onClick={() =>
													form.removeListItem(`questions.${i}.answers`, i)
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
		</Stack>
	);
};

const QuizCreateRoute = createRoute({
	path: '/quizzes/create',
	getParentRoute: () => AppLayoutRoute,
	component: QuizCreate,
});

export { QuizCreateRoute };
