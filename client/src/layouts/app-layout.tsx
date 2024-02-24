import { Outlet, createRoute } from '@tanstack/react-router';
import { RootLayoutRoute } from './root-layout';
import { Navbar } from './navbar';

const AppLayout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

const AppLayoutRoute = createRoute({
	id: 'app-layout',
	getParentRoute: () => RootLayoutRoute,
	component: AppLayout,
});

export { AppLayoutRoute };
