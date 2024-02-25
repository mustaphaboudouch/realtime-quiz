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
import { QuizRoute } from './pages/quiz';
import { QuizCreateRoute } from './pages/quiz-create';

const routes = RootLayoutRoute.addChildren([
	AuthLayoutRoute.addChildren([SignInRoute, SignUpRoute]),
	AppLayoutRoute.addChildren([
		DashboardRoute,
		QuizzesRoute,
		QuizCreateRoute,
		QuizRoute,
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
