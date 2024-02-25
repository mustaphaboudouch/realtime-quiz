import { Outlet, createRoute } from '@tanstack/react-router';
import { AppShell, Container } from '@mantine/core';
import { RootLayoutRoute } from './root-layout';
import { Navbar } from './navbar';

const AuthLayout = () => {
	return (
		<AppShell header={{ height: 60 }}>
			<AppShell.Header>
				<Container h='100%'>
					<Navbar />
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
});

export { AuthLayoutRoute };
