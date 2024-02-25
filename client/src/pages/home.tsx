import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';
import { QuizList } from '../components/quiz-list';
import { SessionJoin } from '../components/session-join';

const Home = () => {
	const { role } = HomeRoute.useRouteContext();

	return role === 'ADMIN' ? <QuizList /> : <SessionJoin />;
};

const HomeRoute = createRoute({
	path: '/',
	getParentRoute: () => AppLayoutRoute,
	component: Home,
});

export { HomeRoute };
