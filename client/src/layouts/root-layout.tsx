import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

type RootLayoutRouteContext = {
	isAuthenticated: boolean;
	role: 'ADMIN' | 'CLIENT' | null;
};

const RootLayout = () => {
	return <Outlet />;
};

const RootLayoutRoute = createRootRouteWithContext<RootLayoutRouteContext>()({
	component: RootLayout,
});

export { RootLayoutRoute };
