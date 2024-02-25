import { Outlet, createRoute, redirect } from '@tanstack/react-router';
import { AppShell, Container } from '@mantine/core';
import { RootLayoutRoute } from './root-layout';
import { Navbar } from './navbar';

const AuthLayout = () => {
	const { user } = AuthLayoutRoute.useRouteContext();

	return (
		<AppShell header={{ height: 60 }}>
			<AppShell.Header>
				<Container h='100%'>
					<Navbar user={user} />
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
	beforeLoad: ({ context: { user } }) => {
		if (!!user) {
			throw redirect({ to: '/' });
		}
	},
});

export { AuthLayoutRoute };
