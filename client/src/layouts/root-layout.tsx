import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

type RootLayoutRouteContext = {
	isAuthenticated: boolean;
};

const RootLayout = () => {
	return <Outlet />;
};

const RootLayoutRoute = createRootRouteWithContext<RootLayoutRouteContext>()({
	component: RootLayout,
});

export { RootLayoutRoute };
