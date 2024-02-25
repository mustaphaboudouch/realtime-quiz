import { Outlet, createRoute, redirect } from '@tanstack/react-router';
import { AppShell, Container } from '@mantine/core';
import { RootLayoutRoute } from './root-layout';
import { Navbar } from './navbar';

const AuthLayout = () => {
	const { isAuthenticated, role } = AuthLayoutRoute.useRouteContext();

	return (
		<AppShell header={{ height: 60 }}>
			<AppShell.Header>
				<Container h='100%'>
					<Navbar isAuthenticated={isAuthenticated} role={role} />
				</Container>
			</AppShell.Header>
			<AppShell.Main>
				<Container size='xs' py='xl'>
					<Outlet />
				</Container>
			</AppShell.Main>
		</AppShell>
	);
};

const AuthLayoutRoute = createRoute({
	id: 'auth-layout',
	getParentRoute: () => RootLayoutRoute,
	component: AuthLayout,
	beforeLoad: ({ context: { isAuthenticated } }) => {
		if (isAuthenticated) {
			throw redirect({ to: '/' });
		}
	},
});

export { AuthLayoutRoute };
