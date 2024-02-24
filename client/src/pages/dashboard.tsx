import { createRoute } from '@tanstack/react-router';
import { AppLayoutRoute } from '../layouts/app-layout';

const Dashboard = () => {
	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	);
};

const DashboardRoute = createRoute({
	path: '/',
	getParentRoute: () => AppLayoutRoute,
	component: Dashboard,
});

export { DashboardRoute };
