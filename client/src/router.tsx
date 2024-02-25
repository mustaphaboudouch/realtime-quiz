import {
	RouterProvider as TanstackRouterProvider,
	createRouter,
} from '@tanstack/react-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { RootLayoutRoute } from './layouts/root-layout';
import { AuthLayoutRoute } from './layouts/auth-layout';
import { AppLayoutRoute } from './layouts/app-layout';

import { SignInRoute } from './pages/sign-in';
import { SignUpRoute } from './pages/sign-up';
import { DashboardRoute } from './pages/dashboard';
import { QuizzesRoute } from './pages/quizzes';
import { QuizRoute } from './pages/quiz';
import { QuizCreateRoute } from './pages/quiz-create';
import { useLocalStorage } from '@mantine/hooks';
import { User } from './types';

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
		user: null,
	},
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const Router = () => {
	const [value] = useLocalStorage({ key: 'jwt-token' });

	const { data, isLoading } = useQuery({
		queryKey: ['me'],
		queryFn: async () => {
			const { data } = await axios.get('http://127.0.0.1:3000/me', {
				headers: {
					Authorization: 'Bearer ' + value,
				},
			});
			return data;
		},
		enabled: !!value,
		retry: false,
	});

	const user = data as unknown as User;

	return (
		!isLoading && <TanstackRouterProvider router={router} context={{ user }} />
	);
};

export { Router };
