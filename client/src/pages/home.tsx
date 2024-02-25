import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';
import { QuizList } from '../components/quiz-list';
import { SubscriptionList } from '../components/subscription-list';

const Home = () => {
	const { role } = HomeRoute.useRouteContext();

	return role === 'ADMIN' ? <QuizList /> : <SubscriptionList />;
};

const HomeRoute = createRoute({
	path: '/',
	getParentRoute: () => AppLayoutRoute,
	component: Home,
});

export { HomeRoute };
