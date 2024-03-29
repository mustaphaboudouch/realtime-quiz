import { Outlet, createRoute, redirect } from '@tanstack/react-router';
import { AppShell, Container } from '@mantine/core';
import { RootLayoutRoute } from './root-layout';
import { Navbar } from './navbar';

const AppLayout = () => {
	const { isAuthenticated, role } = AppLayoutRoute.useRouteContext();

	return (
		<AppShell header={{ height: 60 }}>
			<AppShell.Header>
				<Container h='100%'>
					<Navbar isAuthenticated={isAuthenticated} role={role} />
				</Container>
			</AppShell.Header>
			<AppShell.Main>
				<Container py='xl'>
					<Outlet />
				</Container>
			</AppShell.Main>
		</AppShell>
	);
};

const AppLayoutRoute = createRoute({
	id: 'app-layout',
	getParentRoute: () => RootLayoutRoute,
	component: AppLayout,
	beforeLoad: ({ context: { isAuthenticated } }) => {
		if (!isAuthenticated) {
			throw redirect({ to: '/sign-in' });
		}
	},
});

export { AppLayoutRoute };
