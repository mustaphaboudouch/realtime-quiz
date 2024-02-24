import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';

const Quizzes = () => {
	return (
		<div>
			<h1>Quizzes</h1>
		</div>
	);
};

const QuizzesRoute = createRoute({
	path: '/quizzes',
	getParentRoute: () => AppLayoutRoute,
	component: Quizzes,
});

export { QuizzesRoute };
