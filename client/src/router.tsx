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

const routes = RootLayoutRoute.addChildren([
	AuthLayoutRoute.addChildren([SignInRoute, SignUpRoute]),
	AppLayoutRoute.addChildren([DashboardRoute, QuizzesRoute, QuizRoute]),
]);

const router = createRouter({
	routeTree: routes,
	defaultPreload: 'intent',
	defaultPreloadStaleTime: 0,
	context: {
		user: null,
	},
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const Router = () => {
	return <TanstackRouterProvider router={router} />;
};

export { Router };
