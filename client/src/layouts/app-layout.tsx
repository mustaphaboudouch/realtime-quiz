import { Outlet, createRoute } from '@tanstack/react-router';
import { AppShell, Container } from '@mantine/core';
import { RootLayoutRoute } from './root-layout';
import { Navbar } from './navbar';

const AppLayout = () => {
	return (
		<AppShell header={{ height: 60 }}>
			<AppShell.Header>
				<Container h='100%'>
					<Navbar />
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
});

export { AppLayoutRoute };
