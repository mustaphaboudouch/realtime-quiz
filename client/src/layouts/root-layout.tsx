import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { Socket } from 'socket.io-client';

type RootLayoutRouteContext = {
	isAuthenticated: boolean;
	role: 'ADMIN' | 'CLIENT' | null;
	socket: Socket | null;
};

const RootLayout = () => {
	return <Outlet />;
};

const RootLayoutRoute = createRootRouteWithContext<RootLayoutRouteContext>()({
	component: RootLayout,
});

export { RootLayoutRoute };
