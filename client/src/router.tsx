import {
	RouterProvider as TanstackRouterProvider,
	createRouter,
} from '@tanstack/react-router';

import { RootLayoutRoute } from './layouts/root-layout';
import { AuthLayoutRoute } from './layouts/auth-layout';
import { AppLayoutRoute } from './layouts/app-layout';

import { SignInRoute } from './pages/sign-in';
import { SignUpRoute } from './pages/sign-up';
import { DashboardRoute } from './pages/dashboard';
import { QuizzesRoute } from './pages/quizzes';
import { QuizCreateRoute } from './pages/quiz-create';
import { QuizEditRoute } from './pages/quiz-edit';
import { SessionsRoute } from './pages/sessions';

const routes = RootLayoutRoute.addChildren([
	AuthLayoutRoute.addChildren([SignInRoute, SignUpRoute]),
	AppLayoutRoute.addChildren([
		DashboardRoute,
		QuizzesRoute,
		QuizCreateRoute,
		QuizEditRoute,
		SessionsRoute,
	]),
]);

const router = createRouter({
	routeTree: routes,
	defaultPreload: 'intent',
	defaultPreloadStaleTime: 0,
	context: {
		isAuthenticated: false,
	},
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const Router = () => {
	const token = localStorage.getItem('jwt-token');

	return (
		<TanstackRouterProvider
			router={router}
			context={{ isAuthenticated: !!token }}
		/>
	);
};

export { Router };
