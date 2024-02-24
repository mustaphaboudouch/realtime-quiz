import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';

const Quiz = () => {
	return (
		<div>
			<h1>Quiz</h1>
		</div>
	);
};

const QuizRoute = createRoute({
	path: '/quizzes/$id',
	getParentRoute: () => AppLayoutRoute,
	component: Quiz,
});

export { QuizRoute };
