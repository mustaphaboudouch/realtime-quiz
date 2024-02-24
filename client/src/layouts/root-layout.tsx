import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { User } from '../types';

type RootLayoutRouteContext = {
	user: User | null;
};

const RootLayout = () => {
	return <Outlet />;
};

const RootLayoutRoute = createRootRouteWithContext<RootLayoutRouteContext>()({
	component: RootLayout,
});

export { RootLayoutRoute };
