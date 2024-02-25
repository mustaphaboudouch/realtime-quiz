import {
	RouterProvider as TanstackRouterProvider,
	createRouter,
} from '@tanstack/react-router';

import { RootLayoutRoute } from './layouts/root-layout';
import { AuthLayoutRoute } from './layouts/auth-layout';
import { AppLayoutRoute } from './layouts/app-layout';

import { SignInRoute } from './pages/sign-in';
import { SignUpRoute } from './pages/sign-up';
import { HomeRoute } from './pages/home';
import { QuizCreateRoute } from './pages/quiz-create';
import { QuizEditRoute } from './pages/quiz-edit';
import { SessionsRoute } from './pages/sessions';
import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

const routes = RootLayoutRoute.addChildren([
	AuthLayoutRoute.addChildren([SignInRoute, SignUpRoute]),
	AppLayoutRoute.addChildren([
		HomeRoute,
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
		role: null,
		socket: null,
	},
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const Router = () => {
	const token = localStorage.getItem('jwt-token');
	const role = localStorage.getItem('role') as 'ADMIN' | 'CLIENT' | null;

	let socket: Socket | null = null;

	useEffect(() => {
		socket = io('http://localhost:3000', {
			autoConnect: true,
			auth: {
				token: 'Bearer ' + token,
			},
		});

		socket.on('connect', () => {
			console.log('Connected to server');
		});

		socket.on('disconnect', () => {
			console.log('Disconnected from server');
		});

		return () => {
			socket?.disconnect();
		};
	}, []);

	return (
		<TanstackRouterProvider
			router={router}
			context={{ isAuthenticated: !!token, role, socket }}
		/>
	);
};

export { Router };
