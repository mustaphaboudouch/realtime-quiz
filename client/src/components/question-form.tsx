import { Button, Card, Checkbox, Group, Stack, Title } from '@mantine/core';
import { Subscription } from '../types';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useNavigate } from '@tanstack/react-router';

const socket = io('http://localhost:3000', {
	auth: {
		token: 'Bearer ' + localStorage.getItem('jwt-token'),
	},
});

const schema = z.object({
	answers: z
		.array(
			z.object({
				_id: z.string().min(1),
				answer: z.string().min(1),
				isSelected: z.boolean(),
			}),
		)
		.min(1),
});

const QuestionForm = (subscription: Subscription) => {
	const navigate = useNavigate();
	const [currentSubscription, setCurrentSubscription] =
		useState<Subscription>(subscription);
	const form = useForm({
		initialValues: {
			answers: currentSubscription.question.answers,
		},
		validate: zodResolver(schema),
	});

	useEffect(() => {
		socket.connect();

		socket.on('QUESTION_ANSWER_ERROR', (error: string) => {
			notifications.show({
				message: error,
			});
		});

		socket.on('QUESTION_NEXT_SUCCESS', (data: Subscription) => {
			notifications.show({
				message: 'Bravo! Correct answer',
			});
			form.setFieldValue('answers', data.question.answers);
			setCurrentSubscription(data);
		});

		socket.on('QUESTION_NEXT_ERROR', (data: Subscription) => {
			notifications.show({
				message: 'Oooops! Incorrect answer',
			});
			form.setFieldValue('answers', data.question.answers);
			setCurrentSubscription(data);
		});

		socket.on('QUESTION_DONE_SUCCESS', (id: string) => {
			notifications.show({
				message: 'Bravo! Correct answer',
			});
			navigate({
				to: '/subscriptions/$id',
				params: {
					id,
				},
			});
		});

		socket.on('QUESTION_DONE_ERROR', (id: string) => {
			notifications.show({
				message: 'Oooops! Incorrect answer',
			});
			navigate({
				to: '/subscriptions/$id',
				params: {
					id,
				},
			});
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	function onSubmit() {
		const validation = form.validate();
		if (!validation.hasErrors) {
			socket.emit('QUESTION_ANSWER', {
				subscriptionId: currentSubscription._id,
				questionId: currentSubscription.question._id,
				answers: form.values.answers,
			});
		}
	}

	return (
		<Card radius='md' withBorder>
			<Title order={3} mb='md'>
				{currentSubscription.question.question}
			</Title>

			<Stack>
				{currentSubscription.question.answers.map((answer, index) => (
					<Checkbox
						key={index}
						value={answer._id}
						label={answer.answer}
						{...form.getInputProps(`answers.${index}.isSelected`)}
					/>
				))}
			</Stack>

			<Group justify='flex-end'>
				<Button onClick={onSubmit}>
					{currentSubscription.hasMoreQuestions ? 'Next' : 'Send'}
				</Button>
			</Group>
		</Card>
	);
};

export { QuestionForm };
