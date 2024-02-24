import { Outlet, createRoute } from '@tanstack/react-router';
import { RootLayoutRoute } from './root-layout';
import { Navbar } from './navbar';

const AuthLayout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

const AuthLayoutRoute = createRoute({
	id: 'auth-layout',
	getParentRoute: () => RootLayoutRoute,
	component: AuthLayout,
});

export { AuthLayoutRoute };
